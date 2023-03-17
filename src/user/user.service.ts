import {
  ConflictException,
  Inject,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import * as _ from 'lodash';
import { UtilService } from '../utils';
import { CreateUserDto, LoginUserDto, UpdateUserDto } from './dto';
import { UserRepository } from './user.repository';

const allowedDeposit = [
  5,
  10,
  20,
  50,
  100,
]
@Injectable()
export class UserService {
  @Inject(UserRepository)
  private readonly userRepo: UserRepository;
  @Inject(UtilService)
  private readonly utilService: UtilService;

  public async create(data: CreateUserDto) {
    await this.throwIfUserExists(data);

    // Hash password
    data.password = await this.utilService.hashPassword(data.password);

    const user = await this.userRepo.create(data);
    delete user.password;

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, username: user.username, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
    } catch (e) {
      console.log(e);
      await this.rollbackUserAccount(user);
      // Throw error
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }
    return { user, auth_token: token };
  }

  public async throwIfUserExists(data: CreateUserDto): Promise<void> {
    let existingUser;

    // check if user exists using email
    if (data.username) {
      existingUser = await this.userRepo.findOne({
        username: data.username.toLowerCase(),
      });
    }

    if (existingUser) {
      throw new ConflictException('User with the username already exists');
    }
  }

  public async rollbackUserAccount(user: any): Promise<void> {
    return await this.userRepo.delete(user.id);
   }

  public async login(loginData: LoginUserDto): Promise<any> {
    const user = await this.userRepo.findOneWithGraph(
      { username: loginData.username },
     '',
    );
    if (!user) {
      throw new ConflictException('User with the username does not exist');
    }

    // Check if password matches
    const isPasswordMatched = await this.utilService.comparePassword(
      loginData.password,
      user.password,
    );

    if (!isPasswordMatched) {
      throw new ConflictException('Password does not match');
    }

    // Generate JWT token
    let token;
    try {
      const tokenData = { id: user.id, username: user.username, role: user.role };
      token = this.utilService.generateJwtToken(tokenData);
    } catch (e) {
      throw new InternalServerErrorException(
        `Error generating JWT token: ${e.message}`,
      );
    }
    delete user.password;
    return { user, auth_token: token };
  }

  public async findById(id: string) {
    const user = await this.userRepo.findOneWithGraph(
      { id },
      '[transactions]'
    );
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return user;
  }

  public async update(id: string, data: UpdateUserDto) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (data.role) {
      throw new BadRequestException('Role cannot be updated');
    }
    if (data.password) {
      data.password = await this.utilService.hashPassword(data.password);
    }
    return this.userRepo.update(id, data);
  }

  public async findAll() {
    return this.userRepo.findAll();
  }

  public async delete(id: string) {
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    return this.userRepo.delete(id);
  }

  public async deposit(id: string, data: any) {

// check if user data.deposit is in allowed deposit
    if (!allowedDeposit.includes(data.deposit)) {
      throw new BadRequestException('Deposit amount not allowed');
    }
    const user = await this.userRepo.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    if (user.role !== 'buyer') {
      throw new BadRequestException('User not allowed to deposit');
    }
    const deposit = data.deposit;
    // convert to cent
    const depositInCent = deposit * 100;
    const balance = user.deposit;
    const newBalance = balance + depositInCent;
    
    return await this.userRepo.update(id, { deposit: newBalance });
  }
}

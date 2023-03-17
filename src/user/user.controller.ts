import {
  Controller,
  Post,
  Body,
  HttpStatus,
  Inject,
  Get,
  Param,
  Put,
  Request,
  UseGuards,
  Delete,
  Req,
} from '@nestjs/common';
import { BaseService } from '../base';
import { UserService } from './user.service';
import { CreateUserDto, UpdateUserDto, LoginUserDto } from './dto';
import { JwtAuthGuard } from '../auth';

@Controller('users')
export class UserController {
  @Inject(UserService)
  private readonly userService: UserService;
  @Inject(BaseService)
  private readonly baseService: BaseService;

  @Get('')
  public async findAll() {
    const users = await this.userService.findAll();
    return this.baseService.transformResponse(
      'Users fetched successfully',
      users,
      HttpStatus.OK,
    );
  }

  @Post('/signup')
  public async create(@Body() data: CreateUserDto) {
    const newUser = await this.userService.create(data);

    return this.baseService.transformResponse(
      'User created successfully',
      newUser,
      HttpStatus.CREATED,
    );
  }

  @Post('/login')
  public async login(@Body() LoginUserDto: LoginUserDto) {
    const user = await this.userService.login(LoginUserDto);
    return this.baseService.transformResponse(
      'User logged in successfully',
      user,
      HttpStatus.OK,
    );
  }
 
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  public async getUserById(@Param('id') id: string) {
    const user = await this.userService.findById(id);
    delete user.password;
    return this.baseService.transformResponse(
      'User retrieved successfully',
       {
        user,
        auth_token: '',
       },
      HttpStatus.OK,
    );
  }

  @Put(':id')
  @UseGuards(JwtAuthGuard)
  public async updateUserInfo(
    @Param('id') id: string,
    @Body() data: UpdateUserDto,
  ) {
    const updatedUser = await this.userService.update(id, data);
    delete updatedUser.password;
    return this.baseService.transformResponse(
      'User updated successfully',
      { user: updatedUser },
      HttpStatus.OK,
    );
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  public async delete(@Param('id') id: string) {
    await this.userService.delete(id);
    return this.baseService.transformResponse(
      'User deleted successfully',
      {},
      HttpStatus.OK,
    );
  }

  @Post('/deposit')
  @UseGuards(JwtAuthGuard)
  public async deposit(@Body() data: any, @Req() req) {
    const id = req.user.aud;
    const deposit = await this.userService.deposit(id, data);
    return this.baseService.transformResponse(
      'Deposit successful',
      deposit,
      HttpStatus.OK,
    );
  }
}

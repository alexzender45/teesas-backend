import { Test, TestingModule } from '@nestjs/testing';
import { UtilModule, UtilService } from '../utils';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;
  const user = {
    user: {
      id: 'b4c3a188-5a9f-4210-8f6d-1871359ded98',
      username: 'Samuel888',
      role: 'buyer',
      password: '12345',
      deposit: 4000,
    },
  };
  const mockUserService = {
    create: jest.fn().mockImplementation(() => user),
    login: jest.fn().mockImplementation(() => user),
    findById: jest.fn().mockImplementation((di: string) => user),
    update: jest.fn().mockImplementation((data: any) => user),
    delete: jest.fn().mockImplementation((id: string) => user),
    findOneWithGraph: jest.fn().mockImplementation((id: string) => user),
    findAll: jest.fn().mockImplementation(() => [user]),
    findOne: jest.fn().mockImplementation((id: string) => user),
    deposit: jest.fn().mockImplementation((data:any) => user)
  };
  const mockUtilService = {
    getToken: jest.fn().mockImplementation(() => 'token'),
    hashPassword: jest.fn().mockImplementation(() => 'hash'),
    comparePassword: jest.fn().mockImplementation(() => true),
    generateJwtToken: jest.fn().mockImplementation(() => 'token'),
    ecodeJwtToken: jest.fn().mockImplementation(() => 'token'),
    generatePassword: jest.fn().mockImplementation(() => 'password'),
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [UtilModule],
      // controllers: [UserController],
      providers: [
        UserService,
        UserRepository,
        UtilService,
      ],
    })
      .overrideProvider(UserRepository)
      .useValue(mockUserService)
      .overrideProvider(UtilService)
      .useValue(mockUtilService)
      .compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should create user', async () => {
    const result = await service.create({
      username: 'Samuel',
      role: 'buyer',
      password: '12345',
      deposit: 399,
    });
    expect(result.user.user.id).toEqual('b4c3a188-5a9f-4210-8f6d-1871359ded98');
    expect(result.user.user.first_name).toEqual('Samuel');
    expect(result.user.user.last_name).toEqual('Efe');
    expect(result.user.user).toHaveProperty('dob');
    expect(result.user.user).toHaveProperty('gender');
    expect(mockUserService.create).toHaveBeenCalled();
  });

  
});

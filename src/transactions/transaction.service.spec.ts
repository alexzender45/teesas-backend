// import { Test, TestingModule } from '@nestjs/testing';
// import { UtilModule } from '../utils';
// import { PasswordResetRepository } from './product.repository';
// import { PasswordResetService } from './product.service';

// describe('PasswordResetService', () => {
//   let service: PasswordResetService;
//   const user = {
//     id: 'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     name: 'hippo345',
//   };
//   const mockPasswordResetService = {
//     create: jest.fn().mockImplementation(() => user),
//     findAll: jest.fn().mockImplementation(() => [user]),
//     findById: jest.fn().mockImplementation((id) => user),
//     delete: jest.fn().mockImplementation((id) => user),
//     findOne: jest.fn().mockImplementation((data) => user),
//     update: jest.fn().mockImplementation((data) => user),
//     findMany: jest.fn().mockImplementation((data) => [user]),
//   };
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       imports: [UtilModule],
//       providers: [PasswordResetService, PasswordResetRepository],
//     })
//       .overrideProvider(PasswordResetRepository)
//       .useValue(mockPasswordResetService)
//       .compile();

//     service = module.get<PasswordResetService>(PasswordResetService);
//   });

//   it('should be defined', () => {
//     expect(service).toBeDefined();
//   });

//   it('it should create password reset', async () => {
//     const passwordReset = await service.create({
//       token: '',
//       user_id: '',
//     });
//     expect(passwordReset).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty('name', 'hippo345');
//   });

//   it('it should get all password resets', async () => {
//     const passwordReset = await service.findAll();
//     expect(passwordReset[0]).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset[0]).toHaveProperty('name', 'hippo345');
//   });

//   it('it should get password reset by id', async () => {
//     const passwordReset = await service.findById(
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty('name', 'hippo345');
//   });

//   it('it should delete password reset', async () => {
//     const passwordReset = await service.delete(
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty('name', 'hippo345');
//   });

//   it('it should find password reset by data', async () => {
//     const passwordReset = await service.findOne({
//       token: '',
//       user_id: '',
//     });
//     expect(passwordReset).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty('name', 'hippo345');
//   });

//   it('should find many password resets', async () => {
//     const passwordReset = await service.findMany({});
//     expect(passwordReset[0]).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset[0]).toHaveProperty('name', 'hippo345');
//   });

//   it('should update password reset', async () => {
//     const passwordReset = await service.update(
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//       {
//         token: '',
//         user_id: '',
//       },
//     );
//     expect(passwordReset).toHaveProperty(
//       'id',
//       'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
//     );
//     expect(passwordReset).toHaveProperty('name', 'hippo345');
//   });
// });

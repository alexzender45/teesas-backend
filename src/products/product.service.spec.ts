import { Test, TestingModule } from '@nestjs/testing';
import { UtilModule } from '../utils';
import { ProductRepository } from './product.repository';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  const product = {
    id: 'b4c3a188-5a9f-4210-8f6d-1871359ded98',
    product_name: 'Samuel',
    cost: 4000,
    amount_available: 10,
    seller_id: 'b4c3a188-5a9f-4210-8f6d-1871359ded98'
  };

  const mockProductService = {
    create: jest.fn().mockImplementation(() => product),
    findAll: jest.fn().mockImplementation(() => [product]),
    findById: jest.fn().mockImplementation((id) => product),
    delete: jest.fn().mockImplementation((id) => product),
    findOne: jest.fn().mockImplementation((data) => product),
    update: jest.fn().mockImplementation((id, data) => product),
    buyProduct: jest.fn().mockImplementation((id, data)=> product)
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService, ProductRepository],
    })
      .overrideProvider(ProductRepository)
      .useValue(mockProductService)
      .compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('it should create product', async () => {
    const product = await service.create({
      product_name: 'Samuel',
      cost: 4000,
      amount_available: 10,
      seller_id: 'b4c3a188-5a9f-4210-8f6d-1871359ded98',
    }, 'buyer');
    expect(product).toHaveProperty(
      'id',
      'be69c423-1a50-4b4e-a3df-1ae9e8389db1',
    );
    expect(product).toHaveProperty('product_name', 'Samuel');
  });
  
});

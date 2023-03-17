import { Inject, Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateProductDto, UpdateProductDto } from './dto';
import { ProductRepository } from './product.repository';
import { TransactionService } from '../transactions';
import { UserService } from '../user';

@Injectable()
export class ProductService {
  @Inject(ProductRepository)
  private readonly productRepo: ProductRepository;

  @Inject(TransactionService)
  private readonly transactionService: TransactionService;

  @Inject(UserService)
  private readonly userService: UserService;

  public async create(data: CreateProductDto, role:string) {
    if(role === 'seller'){
      data.cost = data.cost * 100;
    return await this.productRepo.create(data);
    }
    else{
      throw new Error('You are not authorized to create a product');
    }
  }

  public async findById(id: string) {
    return this.productRepo.findById(id);
  }

  public async findAll(data?: any) {
    return this.productRepo.findManyWithGraph(data, '[seller]');
  }

  public async findOne(data: UpdateProductDto) {
    return this.productRepo.findOne(data);
  }

  public async findMany(data: UpdateProductDto) {
    return this.productRepo.findManyWithGraph(data, '[seller]');
  }

  public async update(id: string, data: UpdateProductDto, user:string) {
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    if(product && product.seller_id.toString() === user.toString()){
      if(data.cost){
        data.cost = data.cost * 100;
      }
    return this.productRepo.update(id, data);
  }
  else{
    throw new Error('You are not authorized to update this product');
  }
  }

  public async delete(id: string, user:string) {
    const product = await this.productRepo.findById(id);
    if (!product) {
      throw new Error('Product not found');
    }
    if(product && product.seller_id.toString() === user.toString()){
    return this.productRepo.delete(id);
    }
    else{
      throw new Error('You are not authorized to delete this product');
    }
  }

  public async buyProduct(data:any, user:string) {
    const product = await this.productRepo.findById(data.product_id);
    if (!product) {
      throw new Error('Product not found');
    }
    const buyer = await this.userService.findById(user);
    if(
      product && product.seller_id.toString() !== user.toString() && buyer.role !== 'seller'){
        if(product.amount_available === 0){
          throw new Error('Product out of stock');
        }
      const convertToCent = data.cost * 100
      const totalProductCost = convertToCent * product.amount_available;
      const totalUserBalance = buyer.deposit;
      if(totalProductCost > totalUserBalance){
        throw new Error('You do not have enough balance to buy this product');
      }
      const transactionData = {
        product_id: data.product_id,
        user_id: user,
        transaction_amount: totalProductCost,
      }
      await this.transactionService.create(transactionData);
      const newBalance = totalUserBalance - totalProductCost;
      const newAmountAvailable = product.amount_available * 0;
      await this.userService.update(user, {deposit: newBalance});
      await this.productRepo.update(data.product_id, {amount_available: newAmountAvailable});
      return this.userService.findById(user);
    }
    else{
      throw new Error('You are not authorized to buy this product');
    }
  }
}

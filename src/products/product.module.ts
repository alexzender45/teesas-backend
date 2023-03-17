import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { ProductController } from './product.controller';
import { TransactionModule } from '../transactions';
import { UserModule } from '../user';

@Module({
  providers: [ProductService, ProductRepository],
  exports: [ProductService],
  controllers: [ProductController],
  imports: [TransactionModule, UserModule],
})
export class ProductModule {}

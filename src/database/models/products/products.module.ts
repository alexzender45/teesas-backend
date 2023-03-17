import { Module } from '@nestjs/common';
import { ProductModel } from './products.service';

@Module({
  providers: [ProductModel],
  exports: [ProductModel],
})
export class DbProductModule {}

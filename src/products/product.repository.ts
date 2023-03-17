import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base';
import { ProductModel } from '../database';

@Injectable()
export class ProductRepository extends BaseRepository {
  constructor() {
    super(ProductModel);
  }
}

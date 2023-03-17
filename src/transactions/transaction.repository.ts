import { Injectable } from '@nestjs/common';
import { BaseRepository } from '../base';
import { TransactionModel } from '../database';

@Injectable()
export class TransactionRepository extends BaseRepository {
  constructor() {
    super(TransactionModel);
  }
}

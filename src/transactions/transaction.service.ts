import { Inject, Injectable } from '@nestjs/common';
import { userInfo } from 'os';
import { CreateTransactionDto, UpdateTransactionDto } from './dto';
import { TransactionRepository } from './transaction.repository';

@Injectable()
export class TransactionService {
  @Inject(TransactionRepository)
  private readonly transactionRepo: TransactionRepository;

  public async create(data: CreateTransactionDto) {
    return await this.transactionRepo.create(data);
  }
}

import { Module } from '@nestjs/common';
import { TransactionModel } from './transactions.service';

@Module({
  providers: [TransactionModel],
  exports: [TransactionModel],
})
export class DbTransactionModule {}

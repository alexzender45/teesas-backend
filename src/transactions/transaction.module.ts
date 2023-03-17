import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionRepository } from './transaction.repository';
import { TransactionController } from './transaction.controller';

@Module({
  providers: [TransactionService, TransactionRepository],
  exports: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}

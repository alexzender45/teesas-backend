import {
    Controller,
    Post,
    Body,
    HttpStatus,
    Inject,
    Get,
    Param,
    Put,
    Request,
    UseGuards,
    Delete,
    Req,
    Query,
  } from '@nestjs/common';
  import { BaseService } from '../base';
  import { TransactionService } from './transaction.service';
  import { CreateTransactionDto, UpdateTransactionDto } from './dto'
  import { JwtAuthGuard } from '../auth';
  
  @Controller('transactions')
  export class TransactionController {
    @Inject(TransactionService)
    private readonly transactionService: TransactionService;
    @Inject(BaseService)
    private readonly baseService: BaseService;
  
    @Post('')
    @UseGuards(JwtAuthGuard)
    public async create(@Body() data: CreateTransactionDto, @Req() req) {
      const newTransaction = await this.transactionService.create(data);
  
      return this.baseService.transformResponse(
        'Transaction created successfully',
        newTransaction,
        HttpStatus.CREATED,
      );
    }
  }
  
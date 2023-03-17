import { IsNumber, IsString } from 'class-validator';

export class CreateTransactionDto {

  @IsString()
  product_id: string;

  @IsString()
  user_id: string;

  @IsNumber()
  transaction_amount: number;
}

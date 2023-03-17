import { IsNumber, IsString } from 'class-validator';

export class CreateProductDto {

  @IsString()
  product_name: string;

  @IsString()
  seller_id: string;

  @IsNumber()
  cost: number;

  @IsNumber()
  amount_available: number;
}

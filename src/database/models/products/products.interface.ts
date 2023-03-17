import { IBase } from '../base';

export interface IProduct extends IBase {
  seller_id: string;
  product_name: string;
  cost: number;
  amount_available: number;
}

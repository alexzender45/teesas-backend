import { IBase } from '../base';

export interface ITransaction extends IBase {
  user_id: string;
  product_id: string;
  transaction_amount: number;
}

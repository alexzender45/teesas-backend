import { JSONSchema } from 'objection';
import { DatabaseSchema } from '../../database.schema';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { ITransaction } from './transactions.interface';
import { TransactionValidation } from './transactions.validation';
import { UserModel } from '../users';
import { ProductModel } from '../products';

export class TransactionModel extends BaseModel implements ITransaction {
  public id: ITransaction['id'];
  public user_id: ITransaction['user_id'];
  public product_id: ITransaction['product_id'];
  public transaction_amount: ITransaction['transaction_amount'];
  public created_at: ITransaction['created_at'];
  public updated_at: ITransaction['updated_at'];

  static get tableName() {
    return `${DatabaseSchema.userService}.${DatabaseTable.transactions}`;
  }

  static get jsonSchema(): JSONSchema {
    return TransactionValidation;
  }

  static get relationMappings() {
    return {
      user: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseSchema.userService}.${DatabaseTable.transactions}.user_id`,
          to: `${DatabaseSchema.userService}.${DatabaseTable.users}.id`,
        },
      },

      product: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: ProductModel,
        join: {
          from: `${DatabaseSchema.userService}.${DatabaseTable.transactions}.product_id`,
          to: `${DatabaseSchema.userService}.${DatabaseTable.products}.id`,
        },
      },
    };
  }
}

import { JSONSchema } from 'objection';
import { DatabaseSchema } from '../../database.schema';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { IProduct } from './products.interface';
import { ProductValidation } from './products.validation';
import { UserModel } from '../users';
import { TransactionModel } from '../transactions';

export class ProductModel extends BaseModel implements IProduct {
  public id: IProduct['id'];
  public seller_id: IProduct['seller_id'];
  public product_name: IProduct['product_name'];
  public cost: IProduct['cost'];
  public amount_available: IProduct['amount_available'];
  public created_at: IProduct['created_at'];
  public updated_at: IProduct['updated_at'];

  static get tableName() {
    return `${DatabaseSchema.userService}.${DatabaseTable.products}`;
  }

  static get jsonSchema(): JSONSchema {
    return ProductValidation;
  }

  static get relationMappings() {
    return {
      seller: {
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: `${DatabaseSchema.userService}.${DatabaseTable.products}.seller_id`,
          to: `${DatabaseSchema.userService}.${DatabaseTable.users}.id`,
        },
      },

      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: TransactionModel,
        join: {
          from: `${DatabaseSchema.userService}.${DatabaseTable.products}.id`,
          to: `${DatabaseSchema.userService}.${DatabaseTable.transactions}.product_id`,
        },
      },
    };
  }
}

import { JSONSchema } from 'objection';
import { DatabaseSchema } from '../../database.schema';
import { DatabaseTable } from '../../database.tables';
import { BaseModel } from '../base';
import { TransactionModel } from '../transactions';
import { IUser } from './user.interface';
import { UserValidation } from './user.validation';

export class UserModel extends BaseModel implements IUser {
  public id: IUser['id'];
  public username: IUser['username'];
  public role: IUser['role'];
  public deposit?: IUser['deposit'];
  public created_at: IUser['created_at'];
  public updated_at: IUser['updated_at'];
  public password: IUser['password'];

  static get tableName() {
    return `${DatabaseSchema.userService}.${DatabaseTable.users}`;
  }

  static get jsonSchema(): JSONSchema {
    return UserValidation;
  }

  static get relationMappings() {
    return {
      transactions: {
        relation: BaseModel.HasManyRelation,
        modelClass: TransactionModel,
        join: {
          from: `${DatabaseSchema.userService}.${DatabaseTable.users}.id`,
          to: `${DatabaseSchema.userService}.${DatabaseTable.transactions}.user_id`,
        },
      },
    }
  }

}

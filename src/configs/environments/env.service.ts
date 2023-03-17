import { config } from 'dotenv';
import { EnvironmentVariables } from './env.interface';

config();

export class EnvironmentService {
  public static getAll(): EnvironmentVariables {
    return {
      db_host: process.env.DB_HOST,
      db_name: process.env.DB_NAME,
      db_password: process.env.DB_PASSWORD,
      db_port: Number(process.env.DB_PORT),
      db_user: process.env.DB_USER,
      jwt_secret: process.env.JWT_SECRETE_KEY,
      jwt_expires_in: process.env.JWT_EXPIRES_IN,
      node_env: process.env.NODE_ENV,
      port: Number(process.env.PORT),
    };
  }

  public static getValue(key: string): string {
    return EnvironmentService.getAll()[key.toLocaleLowerCase()];
  }
}

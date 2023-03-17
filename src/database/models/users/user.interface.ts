import { IBase } from '../base';

export interface IUser extends IBase {
  username: string;
  role: string;
  deposit?: number;
  password: string;
}

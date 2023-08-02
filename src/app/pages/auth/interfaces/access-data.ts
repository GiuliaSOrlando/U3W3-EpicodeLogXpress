import { IUser } from './user';

export interface IAccessData {
  JWT: string;
  user: IUser;
}

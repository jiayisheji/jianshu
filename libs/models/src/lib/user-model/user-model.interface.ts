import { CrudModel } from '../crud-model.interface';

export interface UserModel extends CrudModel {
  username: string;
}

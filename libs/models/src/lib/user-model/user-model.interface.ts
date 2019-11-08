import { CrudModel } from '../crud-model.interface';

export interface UserModel extends CrudModel {
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 密码
   */
  password: string;
  /**
   * 头像
   */
  avatar: string;
  /**
   * 邮箱
   */
  email: string;
  /**
   * 手机号
   */
  mobile: string;
}

import { Exclude, Expose } from 'class-transformer';

export interface Token {
  expiresIn: number;
  accessToken: string;
  tokenType: string;
}

/**
 * @description 登录响应用户数据
 * @export
 * @class LoginUserDao
 */
@Exclude()
export class LoginUserDao {
  @Expose() public id: string;
  @Expose() public nickname: string;
  @Expose() public avatar: string;
}

/**
 * @description 登录响应数据
 * @export
 * @class LoginDao
 */
export class LoginDao {
  public user: LoginUserDao;
  public token: Token;
}

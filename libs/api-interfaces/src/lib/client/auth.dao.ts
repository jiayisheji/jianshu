import { Expose, Exclude } from 'class-transformer';

/**
 * 登录请求参数
 */
export interface LoginParam {
  /**
   * 手机号或邮箱
   */
  userAccount: string;
  /**
   * 登录密码
   */
  password: string;
}

/**
 * 注册请求参数
 */
export interface RegisterParam {
  /**
   * 昵称
   */
  nickname: string;
  /**
   * 登录密码
   */
  password: string;
  /**
   * 手机号码
   */
  mobile: string;
  /**
   * 手机验证码
   */
  code: string;
}

export interface Token { expiresIn: number; accessToken: string; tokenType: string; }

@Exclude()
export class UserInfo {
  @Expose() public id: string;
  @Expose() public nickname: string;
  @Expose() public avatar: string;
}

export interface LoginDao {
  user: UserInfo;
  token: Token;
}

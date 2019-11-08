import { Expose, Exclude } from 'class-transformer';

/**
 * 登录请求参数
 */
export interface LoginParam {
  /**
   * 手机号或邮箱
   */
  email_or_mobile: string;
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
export class UserInfoEntity {
  @Expose() id: string;
  @Expose() nickname: string;
  @Expose() avatar: string;
}

export interface UserInfo {
  user: UserInfoEntity;
  token: Token;
}

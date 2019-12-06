import { LoginDto } from '@jianshu/api-interfaces';
import { Validator } from 'class-validator';
const validator = new Validator();

class LoginErrorMessage {
  constructor(public message: string) { }
}

export function login(param: LoginDto): null | LoginErrorMessage {
  const { userAccount, password } = param;
  if (validator.isEmpty(userAccount) || validator.isEmpty(password)) {
    return new LoginErrorMessage('手机号码/邮箱地址或密码不能为空');
  }
  if (!(userAccount.indexOf('@') > -1 ? validator.isEmail(userAccount) : validator.isMobilePhone(userAccount, 'zh-CN'))) {
    return new LoginErrorMessage('手机号或邮箱格式不正确');
  }
  return null;
}

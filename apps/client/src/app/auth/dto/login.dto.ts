import { ApiModelProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { LoginParam } from '@jianshu/api-interfaces';

import { EmailOrMobile } from '../validators/email_or_mobile';

export class LoginDto implements LoginParam {
  @ApiModelProperty({
    required: true,
    type: String,
    description: '手机号或邮箱',
    example: '13412345678',
  })
  @IsNotEmpty({
    message: '手机号或邮箱不能为空',
  })
  @EmailOrMobile('email_or_mobile', {
    message: '手机号或邮箱格式不正确',
  })
  readonly email_or_mobile: string;
  @ApiModelProperty({
    required: true,
    type: String,
    description: '登录密码',
    minLength: 6,
    maxLength: 18,
    example: '123456',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  readonly password: string;
}

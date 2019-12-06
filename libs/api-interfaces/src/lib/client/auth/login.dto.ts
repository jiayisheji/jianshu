import { IsNotEmpty } from 'class-validator';
import { ApiModelProperty } from '@nestjs/swagger';
import { EmailOrMobile } from '../../validators/email_or_mobile';

/**
 * @description 登录请求参数
 * @export
 * @class LoginDto
 */
export class LoginDto {
  @ApiModelProperty({
    required: true,
    type: String,
    description: '手机号或邮箱',
    example: '13412345678 or 12345678@qq.com',
  })
  @IsNotEmpty({
    message: '手机号或邮箱不能为空',
  })
  @EmailOrMobile('userAccount', {
    message: '手机号或邮箱格式不正确',
  })
  public readonly userAccount: string;
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
  public readonly password: string;
}

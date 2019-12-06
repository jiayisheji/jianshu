import { ApiModelProperty } from '@nestjs/swagger';
import { Matches, IsByteLength, IsMobilePhone, IsNotEmpty } from 'class-validator';

export class RegisterDto {
  @ApiModelProperty({
    required: true,
    type: String,
    minLength: 2,
    maxLength: 15,
    description: '昵称',
    example: 'jiayi',
  })
  @IsNotEmpty({
    message: '昵称不能为空',
  })
  @IsByteLength(2, 15, {
    context: {
      errorCode: 1000,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
    message: '昵称昵称格式不正确，需要是2-15个字符，只能包含英文中文下划线，不能包含空格',
  })
  public readonly nickname: string;
  @ApiModelProperty({
    required: true,
    type: String,
    description: '手机号',
    minLength: 11,
    maxLength: 11,
    example: '13412345678',
  })
  @IsNotEmpty({
    message: '手机号不能为空',
  })
  @IsMobilePhone('zh-CN', {
    message: '不是合法11位手机号',
  })
  public readonly mobile: string;
  @ApiModelProperty({
    required: true,
    type: String,
    description: '注册密码',
    minLength: 6,
    maxLength: 18,
    example: '123456',
  })
  @IsNotEmpty({
    message: '密码不能为空',
  })
  public readonly password: string;
  @ApiModelProperty({
    required: true,
    type: String,
    description: '手机验证码',
    minLength: 6,
    maxLength: 6,
    example: '123456',
  })
  @IsNotEmpty({
    message: '短信验证码不能为空',
  })
  @Matches(/\d{6}/, {
    message: '短信验证码不是6位数字',
  })
  public readonly code: string;
}

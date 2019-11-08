import { ApiModelProperty } from '@nestjs/swagger';
import { Matches, IsByteLength, IsMobilePhone, IsNotEmpty } from 'class-validator';
import { RegisterParam } from '@jianshu/api-interfaces';
export class RegisterDto implements RegisterParam {
  @ApiModelProperty({
    required: true,
    type: String,
    minLength: 2,
    maxLength: 18,
    description: '昵称',
    example: 'jiayi',
  })
  @IsNotEmpty({
    message: '昵称不能为空',
  })
  @IsByteLength(2, 10, {
    context: {
      errorCode: 1000,
      developerNote: 'The validated string must contain 32 or more characters.',
    },
    message: '昵称长度不是2-10位',
  })
  readonly nickname: string;
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
  readonly mobile: string;
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
  @IsByteLength(6, 18, {
    message: '密码长度不是6-18位',
  })
  readonly password: string;
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
  readonly code: string;
}

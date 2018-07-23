import { ApiModelProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiModelProperty({
        required: true,
        type: String,
        description: '手机号和邮箱',
        example: '13412345678',
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
    readonly password: string;
}
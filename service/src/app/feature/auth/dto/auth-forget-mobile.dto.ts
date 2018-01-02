import { ApiModelProperty } from '@nestjs/swagger';

export class AuthForgetMobileDto {

    @ApiModelProperty({
        type: String,
        description: '用户名',
        required: true,
    })
    readonly username: string;

    @ApiModelProperty({
        type: String,
        description: '密码',
        required: true,
    })
    readonly password: string;

    @ApiModelProperty({
        type: String,
        description: '短信验证码',
        required: true,
    })
    readonly code: string;
}
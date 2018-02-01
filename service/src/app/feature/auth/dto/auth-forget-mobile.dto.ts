import { ApiModelProperty } from '@nestjs/swagger';

export class AuthForgetMobileDto {

    @ApiModelProperty({
        type: String,
        description: '手机号',
        required: true,
    })
    readonly mobile: string;

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
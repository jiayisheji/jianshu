import { ApiModelProperty } from '@nestjs/swagger';

export class RegisterDto {
    @ApiModelProperty({
        required: true,
        type: String,
        minLength: 2,
        maxLength: 18,
        description: '昵称',
        example: 'jiayi',
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
    readonly mobile: string;
    @ApiModelProperty({
        required: true,
        type: String,
        description: '注册密码',
        minLength: 6,
        maxLength: 18,
        example: '123456',
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
    readonly code: string;
}
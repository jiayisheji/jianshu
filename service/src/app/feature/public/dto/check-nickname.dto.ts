import { ApiModelProperty } from '@nestjs/swagger';

export class CheckNicknameDto {

    @ApiModelProperty({
        type: String,
        description: '昵称',
        required: true,
    })
    readonly nickname: string;

}
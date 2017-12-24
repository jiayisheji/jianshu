import { ApiModelProperty } from '@nestjs/swagger';

export class SendMobileCodeDto {

    @ApiModelProperty({
        type: String,
        description: '手机号码',
        required: true,
    })
    readonly mobile: string;

}
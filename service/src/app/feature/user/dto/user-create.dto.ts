import { ApiModelProperty } from '@nestjs/swagger';

export class CreateUsersDTO {

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;

    @ApiModelProperty()
    readonly nickname: string;
}
import { ApiModelProperty } from '@nestjs/swagger';

export class AuthLoginDto {

    @ApiModelProperty()
    readonly username: string;

    @ApiModelProperty()
    readonly password: string;

}
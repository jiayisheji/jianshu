import { Controller, Post, Body, HttpStatus, Res } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { PublicService } from './public.service';
import { SendMobileCodeDto, CheckNicknameDto } from './dto';

@ApiUseTags('公共模块 public')
@Controller('api/v1')
export class PublicController {
    constructor(private readonly _public: PublicService) { }
    @Post('/send_mobile_code')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    sendMobileCode(
        @Res() res,
        @Body() sendMobileCodeDto: SendMobileCodeDto,
    ) {
        res.status(HttpStatus.CREATED).json(this._public.sendMobileCode(sendMobileCodeDto));
    }

    @Post('/check_nickname')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    checkNickname(
        @Res() res,
        @Body() checkNicknameDto: CheckNicknameDto,
    ) {
        res.status(HttpStatus.CREATED).json(this._public.checkNickname(checkNicknameDto));
    }
}
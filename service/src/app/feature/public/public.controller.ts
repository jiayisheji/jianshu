import { Controller, Post, Body, HttpStatus, Res, UseInterceptors } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { PublicService } from './public.service';
import { SendMobileCodeDto, CheckNicknameDto } from './dto';
import { ResponseHandler } from '../../shared';

import { PassportService } from '../../shared';
@ApiUseTags('公共模块 public')
@Controller('api/v1')
export class PublicController {
    constructor(
        private readonly _public: PublicService,
        private responseHandler: ResponseHandler,
        private passportService: PassportService,
    ) { }
    @Post('/send_mobile_code')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async sendMobileCode(
        @Res() res,
        @Body() sendMobileCodeDto: SendMobileCodeDto,
    ) {
        const code = await this._public.sendMobileCode(sendMobileCodeDto);
        res.status(HttpStatus.OK).json(this.responseHandler.invoke(0, '验证码已发送'));
    }

    @Post('/check_nickname')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async checkNickname(
        @Res() res,
        @Body() checkNicknameDto: CheckNicknameDto,
    ) {
        const user = await this._public.checkNickname(checkNicknameDto);
        if (user === null) {
            res.status(HttpStatus.OK).json(this.responseHandler.invoke(0, '验证成功'));
        }
        res.status(HttpStatus.OK).json(this.responseHandler.invoke(1, '昵称已存在'));
    }

    @Post('/getToken')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async getToken(
        @Res() res,
    ) {
        const user = await this.passportService.createToken({ slug: '1' }, 60);
        res.status(HttpStatus.OK).json(this.responseHandler.create(user));
    }
}
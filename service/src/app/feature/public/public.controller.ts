import { Controller, Post, Req, Body, HttpStatus, Res, ForbiddenException } from '@nestjs/common';
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
    @Post('/send_mobile_code/:source')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async sendMobileCode(
        @Res() res,
        @Req() req,
        @Body() sendMobileCodeDto: SendMobileCodeDto,
    ) {
        try {
            const data = await this._public.sendMobileCode(sendMobileCodeDto, req.params.source);
            res.status(HttpStatus.OK)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @Post('/check_nickname')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async checkNickname(
        @Res() res,
        @Body() checkNicknameDto: CheckNicknameDto,
    ) {
        try {
            const data = await this._public.checkNickname(checkNicknameDto);
            res.status(HttpStatus.OK)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
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
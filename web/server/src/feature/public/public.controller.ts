/** @nest */
import { Controller, Get, Render, Post, ForbiddenException, Req, Res, Body, All, Session, Query, Next, Logger, UseGuards } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */

/** Component */
import { PublicService } from './public.service';
import { EmailSendCodeDto, MobileSendCodeDto } from './dto';

@Controller()
export class PublicController {
    private readonly logger = new Logger(PublicController.name, true);
    constructor(private readonly publicService: PublicService) { }

    /**
     * 给邮箱发送验证码
     * @param {*} req
     * @param {*} res
     * @param {EmailSendCodeDto} emailSendCodeDto
     * @returns
     * @memberof PublicController
     */
    @Post('/email/send_code')
    async email_send_code(
        @Req() req,
        @Res() res,
        @Body() emailSendCodeDto: EmailSendCodeDto,
    ) {
        try {
            // 获取响应数据数据
            return await this.publicService.email_send_code(emailSendCodeDto);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    /**
     * 给邮箱发送验证码
     * @param {*} req
     * @param {*} res
     * @param {MobileSendCodeDto} mobileSendCodeDto
     * @returns
     * @memberof PublicController
     */
    @Post('/mobile/send_code')
    async mobile_send_code(
        @Req() req,
        @Res() res,
        @Body() mobileSendCodeDto: MobileSendCodeDto,
    ) {
        try {
            // 获取响应数据数据
            return await this.publicService.mobile_send_code(mobileSendCodeDto);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

}
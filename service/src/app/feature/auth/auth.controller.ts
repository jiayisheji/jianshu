import { Controller, Get, Post, Body, Res, HttpStatus, Logger, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
// swagger dto
import { AuthLoginDto, AuthRegisterDto, AuthForgetMobileDto } from './dto';
import { ResponseHandler } from '../../shared';
import { User } from '../../core';

@ApiUseTags('认证模块 auth')
@Controller('api/v1')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly _auth: AuthService,
        private responseHandler: ResponseHandler,
    ) { }
    @Post('/login')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async login(
        @Res() res,
        @Body() authLoginDto: AuthLoginDto,
    ) {

        try {
            const user = await this._auth.login(authLoginDto);
            // 验证码无效或已过期，请重新发送验证码
            res
                .status(HttpStatus.OK)
                .json(this.responseHandler.create(user));
        } catch (error) {
            res
                .status(HttpStatus.FORBIDDEN)
                .json(this.responseHandler.error(403, error));
        }
    }
    @Post('/register')
    @ApiResponse({ status: 200, description: '注册成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    async register(
        @Res() res,
        @Body() authRegisterDto: AuthRegisterDto,
    ) {
        try {
            const user = await this._auth.register(authRegisterDto);
            // 验证码无效或已过期，请重新发送验证码
            res
                .status(HttpStatus.CREATED)
                .json(this.responseHandler.create(user));
        } catch (error) {
            res
                .status(HttpStatus.FORBIDDEN)
                .json(this.responseHandler.error(403, error));
        }
    }
    @Post('/forget/mobile')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async forgetMobile(
        @Res() res,
        @Body() authForgetMobileDto: AuthForgetMobileDto,
    ) {
        const user = await this._auth.forgetMobile(authForgetMobileDto);
        // 验证码无效或已过期，请重新发送验证码
        res.status(HttpStatus.OK).json(user);
    }

    @Get('/logout')
    @ApiResponse({ status: 200, description: '退出成功' })
    @ApiResponse({ status: 401, description: '未授权' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async logout(
        @Req() req,
        @Res() res,
        @User() user,
    ) {
        try {
            this.logger.log(JSON.stringify(user));
            if (user) {
                delete req.user;
                await this._auth.logout(user.slug);
                return res.status(HttpStatus.OK)
                    .json(this.responseHandler.invoke(0, '退出成功'));
            }
            res
                .status(HttpStatus.FORBIDDEN)
                .json(this.responseHandler.error(403, '退出失败'));
        } catch (error) {
            res
                .status(HttpStatus.FORBIDDEN)
                .json(this.responseHandler.error(403, error));
        }
    }

}
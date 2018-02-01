import { Controller, Get, Post, Body, Res, HttpStatus, Logger, Req, ForbiddenException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
// swagger dto
import { AuthLoginDto, AuthRegisterDto, AuthForgetMobileDto } from './dto';
import { ResponseHandler } from '../../shared';
import { User } from '../../core';

const getClientIP = (req) => {
    let ipAddress;
    const headers = req.headers;
    const forwardedIpsStr = headers['x-real-ip'] || headers['x-forwarded-for'];
    forwardedIpsStr ? ipAddress = forwardedIpsStr : ipAddress = null;
    if (!ipAddress) {
        ipAddress = req.connection.remoteAddress;
    }
    return ipAddress;
};
@ApiUseTags('认证模块 auth')
@Controller('api/v1')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);
    constructor(
        private readonly _auth: AuthService,
    ) {
    }
    @Post('/login')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async login(
        @Req() req,
        @Res() res,
        @Body() authLoginDto: AuthLoginDto,
    ) {
        try {
            // 获取响应数据数据
            const data = await this._auth.login(authLoginDto, getClientIP(req));
            // 响应成功状态和响应数据
            res
                .status(HttpStatus.OK)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
    @Post('/register')
    @ApiResponse({ status: 200, description: '注册成功' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async register(
        @Req() req,
        @Res() res,
        @Body() authRegisterDto: AuthRegisterDto,
    ) {
        try {
            // 获取响应数据数据
            const data = await this._auth.register(authRegisterDto);
            // 响应成功状态和响应数据
            res
                .status(HttpStatus.CREATED)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }
    @Post('/forget/mobile')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async forgetMobile(
        @Res() res,
        @Body() authForgetMobileDto: AuthForgetMobileDto,
    ) {
        try {
            // 获取响应数据数据
            const data = await this._auth.forgetMobile(authForgetMobileDto);
            // 响应成功状态和响应数据
            res.status(HttpStatus.OK)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    @Get('/logout')
    @ApiResponse({ status: 200, description: '退出成功' })
    @ApiResponse({ status: 401, description: '未登录' })
    @ApiResponse({ status: 403, description: '无权限访问' })
    async logout(
        @Req() req,
        @Res() res,
        @User() user,
    ) {
        try {
            // 检查req.user是否存在
            if (!user) {
                throw new ForbiddenException('退出失败');
            }
            // 获取响应数据数据
            const data = await this._auth.logout(user.slug);
            delete req.user;
            res.status(HttpStatus.OK)
                .json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

}
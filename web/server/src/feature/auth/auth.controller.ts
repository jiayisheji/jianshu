/** @nest */
import { Controller, Post, Put, ForbiddenException, Req, Res, Body, Logger, HttpCode, UseFilters, HttpStatus } from '@nestjs/common';

import { ApiUseTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
/** Rxjs */

/** Libraries */
import { Request, Response, NextFunction } from 'express';
/** Dependencies */
import { HttpExceptionFilter } from 'core';
/** Component */
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';

@ApiUseTags('auth')
@Controller()
export class AuthController {
    private readonly logger = new Logger(AuthController.name, true);
    constructor(private readonly authService: AuthService) { }

    /**
     * 注册账号
     * @param {*} req
     * @param {*} res
     * @param {RegisterDto} registerDto
     * @returns
     * @memberof AuthController
     */
    @Post('/register')
    @UseFilters(HttpExceptionFilter)
    @ApiOperation({ title: '注册' })
    @ApiResponse({ status: 201, description: '注册成功' })
    @ApiResponse({ status: 400, description: '参数错误' })
    @ApiResponse({ status: 403, description: '手机号或昵称已被注册' })
    async register(
        @Req() req: Request,
        @Res() res: Response,
        @Body() registerDto: RegisterDto,
    ) {
        try {
            const data = await this.authService.register(registerDto);
            // 获取响应数据数据
            return res.status(HttpStatus.CREATED).json(data);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

    /**
     * 登录账号
     * @param {*} req
     * @param {*} res
     * @param {LoginDto} loginDto
     * @returns
     * @memberof AuthController
     */
    @Post('/login')
    @ApiOperation({ title: '登录' })
    @ApiResponse({ status: 200, description: '登录成功' })
    @ApiResponse({ status: 403, description: '手机号或邮箱没注册' })
    @HttpCode(200)
    async login(
        @Req() req,
        @Res() res,
        @Body() loginDto: LoginDto,
    ) {
        try {
            // 获取响应数据数据
            return await this.authService.login(loginDto);
        } catch (error) {
            throw new ForbiddenException(error);
        }
    }

}
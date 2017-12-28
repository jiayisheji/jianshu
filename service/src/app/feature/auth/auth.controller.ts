import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';
import { AuthRegisterDto } from './dto/auth-register.dto';

@ApiUseTags('认证模块 auth')
@Controller('api/v1')
export class AuthController {
    constructor(private readonly _auth: AuthService) { }
    @Post('/login')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    login(
        @Res() res,
        @Body() authLoginDto: AuthLoginDto,
    ) {
        const user = this._auth.login(authLoginDto);
        res.status(HttpStatus.OK).json(user);
    }
    @Post('/register')
    @ApiResponse({ status: 200, description: '登陆成功' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    register(
        @Res() res,
        @Body() authRegisterDto: AuthRegisterDto,
    ) {
        const user = this._auth.register(authRegisterDto);
        res.status(HttpStatus.OK).json(user);
    }
}
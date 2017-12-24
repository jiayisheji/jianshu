import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiUseTags } from '@nestjs/swagger';
import { AuthLoginDto } from './dto/auth-login.dto';

@ApiUseTags('认证模块 auth')
@Controller('api/v1')
export class AuthController {
    constructor(private readonly _auth: AuthService) { }
    @Post('/login')
    login( @Body() authLoginDto: AuthLoginDto) {
        this._auth.login(authLoginDto);
    }
}
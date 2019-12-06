import {
  Controller,
  Post,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  UseGuards,
  Ip,
  Get,
  Req,
} from '@nestjs/common';
import {
  ApiUseTags,
  ApiOperation,
  ApiUnauthorizedResponse,
  ApiForbiddenResponse,
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiBearerAuth,
  ApiCreatedResponse
} from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { LoginDto, RegisterDto, LoginDao } from '@jianshu/api-interfaces';
import { User } from '@jianshu/database';

@ApiUseTags('Auth')
@ApiBadRequestResponse({ description: 'Invalid input, The response body may contain clues as to what went wrong' })
@ApiUnauthorizedResponse({ description: 'Unauthorized' })
@ApiForbiddenResponse({ description: 'Forbidden' })
@Controller()
export class AuthController {
  private readonly logger = new Logger(AuthController.name, true);
  constructor(private readonly authService: AuthService) { }

  /**
   * 注册账号
   * @param {RegisterDto} registerDto
   * @returns
   * @memberof AuthController
   */
  @Post('/register')
  @ApiOperation({ title: '注册' })
  @ApiCreatedResponse({ description: '注册成功', type: LoginDao })
  @ApiForbiddenResponse({ description: '手机号或昵称已被注册' })
  @HttpCode(HttpStatus.CREATED)
  public async register(
    @Body() registerDto: RegisterDto,
  ) {
    return await this.authService.register(registerDto);
  }

  /**
   * 登录账号
   * @param {LoginDto} loginDto
   * @returns
   * @memberof AuthController
   */
  @Post('/login')
  @ApiOperation({ title: '登录' })
  @ApiOkResponse({ description: '登录成功', type: LoginDao })
  @ApiForbiddenResponse({ description: '手机号或邮箱没注册，密码不正确' })
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  public async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: User,
    @Ip() ip: string
  ) {
    this.logger.log(ip);
    return this.authService.login(user);
  }

  /**
   * 登出账号
   * @returns
   * @memberof AuthController
   */
  @Get('/logout')
  @UseGuards(AuthGuard('jwt'))
  @ApiOperation({ title: '登出' })
  @ApiBearerAuth()
  @ApiOkResponse({ description: '登出成功' })
  @ApiForbiddenResponse({ description: '未登录' })
  @HttpCode(HttpStatus.OK)
  public async logout(@CurrentUser() user: User) {
    this.logger.log(user);
    return {};
  }
}

import {
  Controller,
  Post,
  Req,
  Body,
  Logger,
  HttpCode,
  HttpStatus,
  UseGuards,
  Ip,
  Get,
} from '@nestjs/common';
import { ApiUseTags, ApiResponse, ApiOperation, ApiUnauthorizedResponse, ApiForbiddenResponse, ApiBadRequestResponse, ApiOkResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './dto';
import { CurrentUser } from './decorators/current-user.decorator';
import { UserModel } from '@jianshu/models';

@ApiUseTags('auth')
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
  @ApiResponse({ status: 201, description: '注册成功' })
  @ApiForbiddenResponse({ description: '手机号或昵称已被注册' })
  @HttpCode(HttpStatus.CREATED)
  async register(
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
  @ApiOkResponse({ description: '登录成功' })
  @ApiForbiddenResponse({ description: '手机号或邮箱没注册，密码不正确' })
  @UseGuards(AuthGuard('local'))
  @HttpCode(HttpStatus.OK)
  async login(
    @Body() loginDto: LoginDto,
    @CurrentUser() user: UserModel,
    @Ip() ip: string
  ) {
    this.logger.log(ip);
    return this.authService.userInfo(user);
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
  async logout() {
    return {};
  }
}

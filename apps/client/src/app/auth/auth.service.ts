import { Injectable, Logger, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserModelService, UserModel } from '@jianshu/models';
import { UserInfo, UserInfoEntity, Token } from '@jianshu/api-interfaces';
import { RegisterDto, LoginDto } from './dto';
import { JwtPayload } from './passport/jwt.strategy';
import { SmsCodeService, SmsCodeLabel } from './sms-code';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, true);
  constructor(
    private readonly userService: UserModelService,
    private readonly smsCodeService: SmsCodeService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 注册
   * 1. 检查参数是否必填和合法
   * 2. 检查用户昵称和手机号是否存在
   * 3. 检查验证码是否正确
   * 4. 加密密码
   * 5. 保存用户
   * 6. 修改用户当前状态为正常
   * 7. 返回昵称，头像，id，token信息
   * @param {RegisterDto} registerDto
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  async register(registerDto: RegisterDto): Promise<UserInfo> {
    /**
     * 查询用户是否存在
     */
    const userExist: UserModel = await this.userService.findOne({
      $or: [
        {
          mobile: registerDto.mobile,
        },
        {
          nickname: registerDto.nickname,
        },
      ],
    });
    /**
     * 如果存在用户 先检查是昵称还是手机号，加以区分在返回给客户端错误
     */
    if (userExist) {
      let message = '';
      if (userExist.mobile === registerDto.mobile) {
        message = '手机号已经被注册';
      }
      if (userExist.nickname === registerDto.nickname) {
        message = '昵称已经被注册';
      }
      throw new ForbiddenException(message);
    }

    /**
     * 获取发送的验证码，进行比对验证
     */
    if (!this.smsCodeService.validateCode(SmsCodeLabel.REGISTER, registerDto.mobile, registerDto.code)) {
      throw new ForbiddenException('手机验证码不正确或者已过期');
    }

    /**
     * 保存用户
     */
    const user: UserModel = await this.userService.create(registerDto);
    /**
     * 返回用户信息和token
     */
    return this.userInfo(user.toJSON());
  }

  /**
   * 登录
   * 1. 检查参数是否必填和合法
   * 2. 邮箱和手机号都可以登录，先判断是手机号还是邮箱，通过@判断
   * 3. 查询账号是否存在
   * 4. 加密密码进行比对是否正确
   * 5. 保存登录历史记录
   * 6. 返回昵称，头像，id，token信息
   * @param {RegisterDto} registerDto
   * @returns {Promise<User>}
   * @memberof AuthService
   */
  async login(loginDto: LoginDto): Promise<UserInfo> {
    /**
     * 判断账号是手机号还是邮箱
     */
    const username: { email?: string; mobile?: string } = {};
    if (loginDto.email_or_mobile.indexOf('@') > -1) {
      username.email = loginDto.email_or_mobile;
    } else {
      username.mobile = loginDto.email_or_mobile;
    }
    /**
     * 查询用户是否存在
     */
    const userExist: UserModel = await this.userService.findOne(username);
    /**
     * 如果用户不存在直接抛出异常给客户端 提醒用户注册
     */
    if (!userExist) {
      throw new ForbiddenException('没有注册');
    }
    /**
     * 验证用户密码，如果不正确抛出异常
     */
    const equal = compareSync(loginDto.password, userExist.password);
    if (!equal) {
      throw new ForbiddenException('账号或密码不正确');
    }

    /**
     * 返回用户信息和token
     */
    return this.userInfo(userExist);
  }

  /**
   * @description 返回昵称，头像，id，token信息
   * @param {UserModel} user
   * @returns {Promise<UserInfo>}
   * @memberof AuthService
   */
  async userInfo(user: UserModel): Promise<UserInfo> {
    const result = plainToClass(UserInfoEntity, user);
    return Promise.resolve({
      user: result,
      token: await this.createToken(user.id),
    });
  }

  async createToken(id: string): Promise<Token> {
    /**
     * TODO: 令牌有效期问题：
     *
     * 使用刷新令牌机制，即第一次创建 accessToken 时，返回 accessToken 和 refreshToken，
     * 当 accessToken 过期时用 refreshToken 刷新获取新的 accessToken，
     * 当 refreToken 过期时，需要重新登录获取 accessToken 和 refreshToken。
     *
     * TODO: 签名秘钥，由安装用户模块的应用管理，在 import 时作为参数传递
     */
    const expiresIn = 3600;
    const accessToken = this.jwtService.sign({ id }, { expiresIn });
    return {
      expiresIn,
      accessToken,
      tokenType: 'Bearer',
    };
  }

  async refreshToken() {

  }

  /**
   * 登录
   * 1. 检查参数是否必填和合法
   * 2. 邮箱和手机号都可以登录，先判断是手机号还是邮箱，通过 @ 判断
   * 3. 查询账号是否存在
   * 4. 加密密码进行比对是否正确
   * 5. 保存登录历史记录
   * 6. 返回用户信息信息
   * @param username
   * @param password
   */
  async validateLocalUser(username: string, password: string): Promise<UserModel> {
    /**
     * 判断账号是手机号还是邮箱
     */
    const name: { email?: string; mobile?: string } = {};
    if (username.indexOf('@') > -1) {
      name.email = username;
    } else {
      name.mobile = username;
    }
    /**
     * 查询用户是否存在
     */
    const userExist: UserModel = await this.userService.findOne(name);
    /**
     * 如果用户不存在直接抛出异常给客户端 提醒用户注册
     */
    if (!userExist) {
      throw new ForbiddenException('没有注册');
    }
    /**
     * 验证用户密码，如果不正确抛出异常
     */
    const equal = compareSync(password, userExist.password);
    if (!equal) {
      throw new ForbiddenException('账号或密码不正确');
    }
    return userExist;
  }

  async validateJwtUser(payload: JwtPayload): Promise<UserModel> {
    return await this.userService.findById(payload.id);
  }
}

import { Injectable, Logger, ForbiddenException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compareSync } from 'bcryptjs';
import { plainToClass } from 'class-transformer';
import { UserRepositoryService, User } from '@jianshu/database';
import { Token, LoginUserDao, LoginDao, RegisterDto } from '@jianshu/api-interfaces';
import { JwtPayload } from './passport/jwt.strategy';
import { SmsCodeService, SmsCodeLabel } from './sms-code';
import { login } from './validators/login';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name, true);
  constructor(
    private readonly userService: UserRepositoryService,
    private readonly smsCodeService: SmsCodeService,
    private readonly jwtService: JwtService
  ) { }

  /**
   * 检查用户名
   * 1. 检查参数是否必填和合法
   * 2. 检查用户昵称是否存在
   * 3. 不存在返回true
   * @param {RegisterDto} registerDto
   * @returns {Promise<boolean>}
   * @memberof AuthService
   */
  public async check_nickname(registerDto: RegisterDto): Promise<boolean> {
    /**
     * 查询用户是否存在
     */
    const userExist: User = await this.userService.findOne({
      nickname: registerDto.nickname,
    });

    /**
     * 如果存在用户 先检查是昵称还是手机号，加以区分在返回给客户端错误
     */
    if (userExist) {
      let message = '';
      if (userExist.nickname === registerDto.nickname) {
        message = '昵称已被使用，换一个吧';
      }
      throw new ForbiddenException(message);
    }

    return Promise.resolve(true);
  }

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
   * @returns {Promise<LoginDao>}
   * @memberof AuthService
   */
  public async register(registerDto: RegisterDto): Promise<LoginDao> {
    /**
     * 查询用户是否存在
     */
    const userExist: User = await this.userService.findOne({
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
        message = '手机号已被使用，换一个吧';
      }
      if (userExist.nickname === registerDto.nickname) {
        message = '昵称已被使用，换一个吧';
      }
      throw new ForbiddenException(message);
    }

    /**
     * 获取发送的验证码，进行比对验证
     */
    if (!this.smsCodeService.validateCode(SmsCodeLabel.REGISTER, registerDto.mobile, registerDto.code)) {
      throw new ForbiddenException('验证码无效或已过期，请重新发送验证码');
    }

    /**
     * 保存用户
     */
    const user: User = await this.userService.create(registerDto);

    /**
     * 返回用户信息和token
     */
    return this.login(user);
  }

  /**
   * @description 返回昵称，头像，id，token信息
   * @param {UserModel} user
   * @returns {Promise<LoginDao>}
   * @memberof AuthService
   */
  public async login(user: User): Promise<LoginDao> {
    const result = plainToClass(LoginUserDao, user);
    return Promise.resolve({
      user: result,
      token: await this.createToken(user.id),
    });
  }

  public async createToken(id: string): Promise<Token> {
    /**
     * TODO: 令牌有效期问题：
     *
     * 使用刷新令牌机制，即第一次创建 accessToken 时，返回 accessToken 和 refreshToken，
     * 当 accessToken 过期时用 refreshToken 刷新获取新的 accessToken，
     * 当 refreshToken 过期时，需要重新登录获取 accessToken 和 refreshToken。
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

  public async refreshToken() {

  }

  /**
   * 验证登录
   * 1. 检查参数是否必填和合法
   * 2. 邮箱和手机号都可以登录，先判断是手机号还是邮箱，通过 @ 判断
   * 3. 查询账号是否存在
   * 4. 加密密码进行比对是否正确
   * 5. 保存登录历史记录
   * 6. 返回用户信息信息
   * @param username
   * @param password
   */
  public async validateLocalUser(username: string, password: string): Promise<User> {
    const invalid = login({
      userAccount: username,
      password
    });
    if (invalid) {
      throw new BadRequestException(invalid.message);
    }
    /**
     * 判断账号是手机号还是邮箱
     */
    const account: { email?: string; mobile?: string } = {};
    if (username.indexOf('@') > -1) {
      account.email = username;
    } else {
      account.mobile = username;
    }

    /**
     * 查询用户是否存在
     */
    const userExist: User = await this.userService.findOne(account, '+password');
    /**
     * 如果用户不存在直接抛出异常给客户端 提醒用户注册
     */
    if (!userExist) {
      throw new ForbiddenException('手机号码/邮箱地址，或密码不正确，请重试');
    }
    /**
     * 验证用户密码，如果不正确抛出异常
     */
    const equal = compareSync(password, userExist.password);
    if (!equal) {
      throw new ForbiddenException('手机号码/邮箱地址，或密码不正确，请重试');
    }

    /**
     * 返回用户信息
     */
    return userExist;
  }

  public async validateJwtUser(payload: JwtPayload): Promise<User> {
    return await this.userService.findById(payload.id);
  }
}

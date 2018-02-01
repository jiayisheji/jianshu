import { Component, Logger, Inject } from '@nestjs/common';
import { UserService } from '../user';
import { FormatData, PassportService, MobileCodeRedis, LoginLockitRedis } from '../../shared';
import { Model } from 'mongoose';
import { ILoginhistory } from './interfaces';

function countdown(timestamp: number): string {
    let d_minutes, d_hours, d_days, d_seconds, ret = '';
    const timeNow = Math.floor(Date.now() / 1000);
    d_seconds = timestamp / 1000 - timeNow;
    if (d_seconds < 0) {
        return '0秒';
    }
    d_days = Math.floor(d_seconds / 86400);
    d_hours = Math.floor(d_seconds / 3600) - d_days * 24;
    d_minutes = Math.floor(d_seconds / 60) - d_days * 24 * 60 - d_hours * 60;
    if (d_days > 0)
        ret += d_days + '天';
    if (d_hours > 0)
        ret += d_hours + '小时';
    if (d_minutes > 0)
        ret += d_minutes + '分';
    return ret + Math.floor(d_seconds - d_days * 24 * 60 * 60 - d_hours * 60 * 60 - d_minutes * 60) + '秒';
}

@Component()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        @Inject('LoginhistoryModelToken') private readonly loginhistoryModel: Model<ILoginhistory>,
        private userService: UserService,
        private passportService: PassportService,
        private mobileCodeRedis: MobileCodeRedis,
        private loginLockitRedis: LoginLockitRedis,
    ) { }
    async login(body, ip) {
        try {
            // 查询用户
            const user = await this.userService.findOne({ username: body.username }, {});
            /** 检查用户名是否存在 */
            if (!user) {
                return Promise.reject({
                    field: 'username',
                    message: '手机号不存在，请先注册',
                    value: body.username,
                });
            }
            // 检查用户有没有被锁定
            const lockit = await this.loginLockitRedis.getLockit(body.username);
            if (lockit) {
                return Promise.reject({
                    field: 'password',
                    message: `多次密码输入不正确，为保障您的账号安全。您的账号已被锁定，${countdown(lockit)}以后再试。`,
                });
            }
            /** 检查密码是否正确 */
            const password = await user.schema.methods.comparePassword(user.password, body.password);
            if (!password) {
                this.loginLockitRedis.count(body.username);
                return Promise.reject({
                    field: 'password',
                    message: '密码不正确，请重新输入',
                });
            }
            // 保存登陆记录到数据库
            await this.loginhistory(user._id, ip, '成功');
            // 返回用户信息
            return this.setToken({
                slug: user.slug,
                nickname: user.nickname,
                avatar: user.avatar,
            });
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    // 保存数据
    async loginhistory(id, ip, remark): Promise<ILoginhistory> {
        const created = new this.loginhistoryModel({
            user: id,
            ip,
            remark,
        });
        return await created.save();
    }

    async register(body): Promise<any> {
        try {
            // 查询用户
            const user = await this.userService.findOne({ username: body.username, nickname: body.nickname });
            // 昵称唯一
            if (user && user.nickname === body.nickname) {
                return Promise.reject({
                    field: 'nickname',
                    message: '昵称 已被使用，换一个吧',
                    value: body.nickname,
                });
            }
            // 用户名唯一
            if (user && user.username === body.username) {
                return Promise.reject({
                    field: 'username',
                    message: '手机号 已被使用，换一个吧',
                    value: body.username,
                });
            }

            // 检查验证有没有过期
            const code = await this.mobileCodeRedis.getCode(body.username, body.code, 'register');
            if (!code) {
                return Promise.reject({
                    field: 'code',
                    message: '验证码无效或已过期，请重新发送验证码',
                });
            }
            // 创建一个用户保存到数据库
            const newUser = await this.userService.create(body);
            // 删除使用过的验证码
            await this.mobileCodeRedis.removeCode(body.username, body.code, 'register');
            // 返回用户信息
            return this.setToken({
                slug: newUser.slug,
                nickname: newUser.nickname,
                avatar: newUser.avatar,
            });
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    async forgetMobile(body) {
        try {
            // 查询用户
            const user = await this.userService.findOne({ username: body.mobile });
            /** 检查用户名是否存在 */
            if (!user) {
                return Promise.reject({
                    field: 'mobile',
                    message: '手机号不存在，请先注册',
                    value: body.mobile,
                });
            }
            // 检查验证有没有过期
            const code = await this.mobileCodeRedis.getCode(body.mobile, body.code, 'forget_mobile');
            if (!code) {
                return Promise.reject({
                    field: 'code',
                    message: '验证码无效或已过期，请重新发送验证码',
                });
            }
            // 加密密码
            const password = await user.schema.methods.encryptionPassword(body.password);
            // 更新密码
            const newUser = await this.userService.update(user.slug, { $set: { password } });
            // 删除使用过的验证码
            await this.mobileCodeRedis.removeCode(body.mobile, body.code, 'forget_mobile');
            // 返回成功信息
            return Promise.resolve({});
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    async logout(id) {
        try {
            await this.passportService.removeToken(id);
            // 返回成功信息
            return Promise.resolve({});
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    async setToken(newUser): Promise<any> {
        try {
            const token = await this.passportService.createToken(newUser, 120000);
            return Promise.resolve({
                ...newUser,
                ...token,
            });
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

}
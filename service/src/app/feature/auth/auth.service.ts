import { Component, Logger } from '@nestjs/common';
import { UserService } from '../user';
import { FormatData, PassportService, MobileCodeRedis } from '../../shared';

@Component()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private userService: UserService,
        private passportService: PassportService,
        private mobileCodeRedis: MobileCodeRedis,
    ) { }
    async login(body) {
        return await this.userService.findOne(body);
    }

    async register(body): Promise<any> {
        try {
            const user = await this.userService.findOne({ username: body.username, nickname: body.nickname });
            if (user && user.username === body.username) {
                return Promise.reject('手机号 已被使用，换一个吧');
            }
            if (user && user.nickname === body.nickname) {
                return Promise.reject('昵称 已被使用，换一个吧');
            }
            const code = await this.mobileCodeRedis.getCode(body.username, body.code);
            if (!code) {
                return Promise.reject('验证码无效或已过期，请重新发送验证码');
            }
            const newUser = await this.userService.create(body);
            await this.mobileCodeRedis.removeCode(body.username, body.code);
            return await this.setToken({
                slug: newUser.slug,
                nickname: newUser.nickname,
                avatar: newUser.avatar,
            });
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    async forgetMobile(body) {
        return await this.userService.findOne(body);
    }

    async logout(id) {
        return await this.passportService.removeToken(id);
    }

    async setToken(newUser): Promise<any> {
        const token = await this.passportService.createToken(newUser, 120000);
        return Promise.resolve({
            ...newUser,
            ...token,
        });
    }

}
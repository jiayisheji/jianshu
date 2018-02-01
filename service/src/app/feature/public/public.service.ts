import { Component, Logger } from '@nestjs/common';
import { UserService } from '../user';
import { SendMobileCodeDto, CheckNicknameDto } from './dto';
import { GeneratRandom, MobileCodeRedis } from '../../shared';
@Component()
export class PublicService {
    private readonly logger = new Logger(PublicService.name);
    constructor(
        private userService: UserService,
        private generatRandom: GeneratRandom,
        private mobileCodeRedis: MobileCodeRedis,
    ) { }
    async sendMobileCode(body, source): Promise<{ message: string } | null> {
        try {
            const code = await this.generatRandom.size(6);
            await this.mobileCodeRedis.saveCode(body.mobile, code, source);
            this.logger.log(code);
            this.logger.log(source);
            return Promise.resolve({ message: '验证码已发送' });
        } catch (error) {
            this.logger.log(error.errmsg);
        }
    }

    async checkNickname(nickname: CheckNicknameDto) {
        try {
            const user = await this.userService.findOne(nickname);
            // 昵称唯一
            if (user) {
                return Promise.reject({
                    field: 'nickname',
                    message: '昵称 已被使用，换一个吧',
                    value: nickname,
                });
            }
            return Promise.resolve({});
        } catch (error) {
            this.logger.log(error.errmsg);
        }

    }
}
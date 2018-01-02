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
    async sendMobileCode(body): Promise<{ code: string } | null> {
        const code = await this.generatRandom.size(6);
        await this.mobileCodeRedis.saveCode(body.mobile, code);
        this.logger.log(code);
        return Promise.resolve({
            code,
        });
    }

    async checkNickname(nickname: CheckNicknameDto) {
        return await this.userService.findOne(nickname);
    }
}
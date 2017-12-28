import { Component } from '@nestjs/common';
import { UserService } from '../user';
import { SendMobileCodeDto, CheckNicknameDto } from './dto';
@Component()
export class PublicService {
    constructor(private userService: UserService) { }
    sendMobileCode(body) {
        return { code: 123456 };
    }

    checkNickname(nickname: CheckNicknameDto) {
        return this.userService.findOne(nickname);
    }
}
/** @nest */
import { Injectable, Logger, NotFoundException } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */
import { UserService, User } from '@shared/mongodb';
/** Component */
import { RegisterDto, LoginDto } from './dto';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name, true);
    constructor(private readonly userService: UserService) { }

    async register(registerDto: RegisterDto): Promise<User> {
        const user: User = await this.userService.create(registerDto);
        this.logger.log('register-----------');
        this.logger.log(JSON.stringify(user));
        return Promise.resolve(user);
    }

    async login(loginDto: LoginDto) {
        let username ;
        if (loginDto.email_or_mobile.indexOf('@') > -1) {
            username = {
                email: loginDto.email_or_mobile,
            };
        } else {
            username = {
                mobile: loginDto.email_or_mobile,
            };
        }

        this.logger.log('login username-----------');
        this.logger.log(JSON.stringify(username));
        const user = await this.userService.unique(username);
        this.logger.log('login user-----------');
        this.logger.log(JSON.stringify(user));
        if (!user) {
            throw new NotFoundException('没有注册');
        }
    }

}
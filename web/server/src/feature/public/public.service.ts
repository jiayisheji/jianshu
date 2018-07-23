/** @nest */
import { Injectable, UnauthorizedException } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */

/** Component */
import { MobileSendCodeDto, EmailSendCodeDto } from './dto';

@Injectable()
export class PublicService {
    constructor() { }

    async email_send_code(emailSendCodeDto: EmailSendCodeDto) {

    }

    async mobile_send_code(mobileSendCodeDto: MobileSendCodeDto) {

    }

}
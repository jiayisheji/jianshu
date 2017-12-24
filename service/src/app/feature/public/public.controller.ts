import { Controller, Post, Body } from '@nestjs/common';
import { ApiUseTags, ApiResponse } from '@nestjs/swagger';
import { PublicService } from './public.service';
import { SendMobileCodeDto } from './dto/send-mobile-code.dto';

@ApiUseTags('公共模块 public')
@Controller('api/v1')
export class PublicController {
    constructor(private readonly _public: PublicService) { }
    @Post('/send_mobile_code')
    @ApiResponse({ status: 201, description: 'The record has been successfully created.' })
    @ApiResponse({ status: 403, description: 'Forbidden.' })
    sendMobileCode( @Body() sendMobileCodeDto: SendMobileCodeDto) {
        this._public.sendMobileCode(sendMobileCodeDto);
    }
}
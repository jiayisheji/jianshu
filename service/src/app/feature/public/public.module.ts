import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';

import { SharedModule } from '../../shared';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { UserModule } from '../user';
import { ValidatorMiddleware } from '../../shared';
import { publicCheckField, publicCheckStrategy } from './public-validator.config';
import RateLimit = require('express-rate-limit');

@Module({
    modules: [SharedModule, UserModule],
    controllers: [PublicController],
    components: [PublicService],
    exports: [],
})
export class PublicModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer
            .apply(new RateLimit({
                windowMs: 60 * 1000, // 1分钟之内请求一次
                delayAfter: 1, // 在第一次请求之后开始减慢响应
                delayMs: 3 * 1000, // 每个请求减慢后续响应3秒
                max: 1, // 1个请求后开始阻塞
                message: '您刚刚发送过一条验证码，如果一分钟内没有收到，您可以再次发送。',
            }))
            .forRoutes({ path: '/api/v1/send_mobile_code', method: RequestMethod.POST })
            .apply(ValidatorMiddleware)
            .with(publicCheckField, publicCheckStrategy)
            .forRoutes(PublicController);
    }
}
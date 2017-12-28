import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';

import { SharedModule } from '../../shared';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';
import { UserModule } from '../user';

@Module({
    modules: [SharedModule, UserModule],
    controllers: [PublicController],
    components: [PublicService],
    exports: [],
})
export class PublicModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply({}).forRoutes(PublicController);
    }
}
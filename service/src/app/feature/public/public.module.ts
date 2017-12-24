import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';

import { SharedModule } from '../../shared';
import { PublicController } from './public.controller';
import { PublicService } from './public.service';

@Module({
    modules: [SharedModule],
    controllers: [PublicController],
    components: [PublicService],
    exports: [],
})
export class PublicModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply({}).forRoutes(PublicController);
    }
}
import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';

import { SharedModule } from '../../shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';

@Module({
    modules: [
        SharedModule,
        UserModule,
    ],
    controllers: [AuthController],
    components: [AuthService],
    exports: [],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply({}).forRoutes(AuthController);
    }
}
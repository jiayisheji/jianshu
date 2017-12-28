import { Module, NestModule, MiddlewaresConsumer } from '@nestjs/common';

import { SharedModule } from '../../shared';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { UserModel } from './user.model';

@Module({
    modules: [SharedModule],
    controllers: [UserController],
    components: [
        UserService,
        UserModel,
    ],
    exports: [
        UserService,
        UserModel,
    ],
})
export class UserModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer.apply({}).forRoutes(UserController);
    }
}
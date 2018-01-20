import { Module, NestModule, MiddlewaresConsumer, RequestMethod } from '@nestjs/common';
import * as passport from 'passport';
import { SharedModule } from '../../shared';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UserModule } from '../user';
import { ValidatorMiddleware } from '../../shared';
import { authCheckStrategy, authCheckField } from './auth-validator.config';
import { LoginhistoryProviders } from './loginhistory.providers';
@Module({
    modules: [
        SharedModule,
        UserModule,
    ],
    controllers: [AuthController],
    components: [
        AuthService,
        ...LoginhistoryProviders,
    ],
    exports: [],
})
export class AuthModule implements NestModule {
    configure(consumer: MiddlewaresConsumer): void {
        consumer
            .apply(passport.authenticate('jwt', { session: false }))
            .forRoutes({ path: '/api/v1/logout', method: RequestMethod.GET })
            .apply(ValidatorMiddleware)
            .with(authCheckField, authCheckStrategy)
            .forRoutes(AuthController);
    }
}
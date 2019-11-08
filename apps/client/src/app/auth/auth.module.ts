import { Module } from '@nestjs/common';
import { UserModelModule } from '@jianshu/models';

import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './passport/jwt.strategy';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from './passport/constants';
import { LocalStrategy } from './passport/local.strategy';
import { AuthSerializer } from './passport/auth.serializer';
import { SmsCodeService } from './sms-code';


@Module({
  imports: [
    UserModelModule,
    JwtModule.register({
      secret: jwtConstants.secret,
      signOptions: {
        expiresIn: '12h'
      }
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, LocalStrategy, AuthSerializer, SmsCodeService],
})
export class AuthModule {
}

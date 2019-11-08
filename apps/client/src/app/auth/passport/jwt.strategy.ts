import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserModel } from '@jianshu/models';
import { jwtConstants } from './constants';

export interface JwtPayload {
  id: string;
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: jwtConstants.secret,
      ignoreExpiration: false,
    });
  }

  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const user: UserModel = await this.authService.validateJwtUser(payload);
    if (!user) {
      return done(new UnauthorizedException('没找到用户'), false);
    }
    done(null, user);
  }
}

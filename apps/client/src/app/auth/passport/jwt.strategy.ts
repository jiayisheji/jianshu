import { ExtractJwt, Strategy, VerifiedCallback } from 'passport-jwt';
import { AuthService } from '../auth.service';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { jwtConstants } from './constants';
import { User } from '@jianshu/database';

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

  public async validate(payload: JwtPayload, done: VerifiedCallback) {
    console.log('validate', payload);
    const user: User = await this.authService.validateJwtUser(payload);
    if (!user) {
      return done(new UnauthorizedException('没找到用户'), false);
    }
    done(null, user);
  }
}

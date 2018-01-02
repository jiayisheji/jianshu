import * as passport from 'passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Component, Logger } from '@nestjs/common';
import { PassportService } from './possport.service';

@Component()
export class JwtStrategy extends Strategy {
    private readonly logger = new Logger(JwtStrategy.name);
    constructor(private readonly passportService: PassportService) {
        super(
            {
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                passReqToCallback: true,
                secretOrKey: passportService.secretOrKey,
            },
            async (req, payload, next) => {
                return await this.verify(req, payload, next);
            },
        );
        passport.use(this);
    }

    public async verify(req, payload, done) {
        const isValid = await this.passportService.validateUser(payload);
        if (!isValid) {
            return done(null, null);
        }
        done(null, payload);
    }
}
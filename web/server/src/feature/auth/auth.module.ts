/** @nest */
import { Module } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */
import { SharedModule } from 'shared';
/** Component */
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';

@Module({
    imports: [
        SharedModule,
    ],
    controllers: [AuthController],
    providers: [AuthService],
})
export class AuthModule { }
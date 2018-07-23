/** @nest */
import { Module } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */

/** Component */
import { AuthModule } from './auth/auth.module';
import { PublicModule } from './public/public.module';

@Module({
    imports: [
        AuthModule,
        // PublicModule,
    ],
    exports: [
        AuthModule,
        // PublicModule,
    ],
})
export class FeatureModule { }
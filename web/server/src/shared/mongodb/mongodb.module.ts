/** @nest */
import { Module } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */

/** Component */
import { UserModule } from './user/user.module';

@Module({
    imports: [UserModule],
    exports: [UserModule],
})
export class MongodbModule { }
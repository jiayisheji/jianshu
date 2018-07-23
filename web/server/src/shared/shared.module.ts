/** @nest */
import { Module } from '@nestjs/common';
/** Rxjs */

/** Libraries */

/** Dependencies */

/** Component */
import { RedisModule } from '@shared/redis';
import { MongodbModule } from '@shared/mongodb';

@Module({
    imports: [
        RedisModule,
        MongodbModule,
    ],
    providers: [],
    exports: [
        RedisModule,
        MongodbModule,
    ],
})
export class SharedModule { }
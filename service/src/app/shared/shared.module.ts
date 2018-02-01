import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';
import { DatabaseModule } from './database';
import { Environments } from './environments';
import { MongooseService } from './mongoose';
import {
    GeneratRandom,
    ResponseHandler,
    FormatData,
} from './helper';
import { PassportService, JwtStrategy } from './passport';

import { MobileCodeRedis, LoginLockitRedis } from './redis';

// 共享注册组件和导出组件
const SharedComponents = [
    Environments,
    MongooseService,
    GeneratRandom,
    ResponseHandler,
    FormatData,
    JwtStrategy,
    PassportService,
    MobileCodeRedis,
    LoginLockitRedis,
];
@Module({
    modules: [DatabaseModule],
    controllers: [],
    components: [
        ...SharedComponents,
    ],
    exports: [
        DatabaseModule,
        ...SharedComponents,
    ],
})
export class SharedModule { }
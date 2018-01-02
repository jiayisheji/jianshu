import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';

import { Environments } from './environments';
import { MongooseService } from './mongoose';
import {
    GeneratRandom,
    ResponseHandler,
    FormatData,
} from './helper';
import { PassportService, JwtStrategy } from './passport';

import { MobileCodeRedis } from './redis';

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
];
@Module({
    modules: [],
    controllers: [],
    components: [
        ...SharedComponents,
    ],
    exports: [
        ...SharedComponents,
    ],
})
export class SharedModule { }
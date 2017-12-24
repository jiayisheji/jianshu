import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';

import { ExpressConfig, ExpressSettings } from './express';

import { MongooseService } from './mongoose';

const SharedComponents = [
    ExpressConfig,
    ExpressSettings,
    MongooseService,
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
export class CoreModule { }
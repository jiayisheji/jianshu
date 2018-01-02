import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';

import { ExpressConfig, ExpressSettings } from './express';

const SharedComponents = [
    ExpressConfig,
    ExpressSettings,
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
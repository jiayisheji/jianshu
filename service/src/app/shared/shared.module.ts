import { MiddlewaresConsumer, Module, RequestMethod } from '@nestjs/common';

import { Environments } from './environments';

@Module({
    modules: [],
    controllers: [],
    components: [
        Environments,
    ],
    exports: [
        Environments,
    ],
})
export class SharedModule { }
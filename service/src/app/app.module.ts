import { Module } from '@nestjs/common';

import { SharedModule } from './shared';
import { AppController } from './app.controller';
import { AppComponent } from './app.component';
import { CoreModule } from './core';

/**
 * 业务模块
 * @export
 * @class AppModule
 */
import { AuthModule, PublicModule, UserModule } from './feature';

@Module({
    modules: [
        CoreModule,
        SharedModule,
        PublicModule,
        UserModule,
        AuthModule,
    ],
    controllers: [AppController],
    components: [AppComponent],
    exports: [AppComponent],
})
export class AppModule { }
import { NgModule, ModuleWithProviders, InjectionToken } from '@angular/core';

export interface ISimpleConfig {
    name: string;
}
export const SIMPLE_CONFIG = new InjectionToken<ISimpleConfig>('simple_config');

import { AvatarModule } from './avatar';
import { ButtonModule } from './button';

@NgModule({
    exports: [
        AvatarModule,
        ButtonModule
    ]
})
export class SimpleModule {
    static forRoot(options?: ISimpleConfig): ModuleWithProviders {
        return {
            ngModule: SimpleModule,
            providers: [
                { provide: SIMPLE_CONFIG, useValue: options },
            ]
        };
    }
}

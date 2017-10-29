
import { NgModule, Optional, SkipSelf } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from '../shared';
import { LayoutModule } from '../layout';

/**
 * 注入公共模块
 */
/* import {ToastModule} from './toast'; */

/**
 * 注入公共服务
 */
import { UsersService } from './users';

@NgModule({
  imports: [
    HttpClientModule,
    // ToastModule,
    LayoutModule
  ],
  providers: [
    UsersService
  ],
  exports: [
    // ToastModule,
  ]
})
export class CoreModule {
  constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only');
    }
  }
}


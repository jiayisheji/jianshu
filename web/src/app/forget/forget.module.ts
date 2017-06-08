import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ForgetComponent } from './forget.component';

import { ROUTER_CONFIG } from './forget.routes';
import { EmailResetComponent } from './email-reset/email-reset.component';
import { MobileResetComponent } from './mobile-reset/mobile-reset.component';

@NgModule({
  imports: [
    CommonModule,
    ROUTER_CONFIG
  ],
  declarations: [
    ForgetComponent,
    EmailResetComponent,
    MobileResetComponent
  ]
})
export class ForgetModule { }

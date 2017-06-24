import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HelpComponent } from './help.component';

import { ROUTER_CONFIG } from './help.routes';

@NgModule({
  imports: [
    CommonModule,
    ROUTER_CONFIG
  ],
  declarations: [
    HelpComponent
  ]
})
export class HelpModule { }

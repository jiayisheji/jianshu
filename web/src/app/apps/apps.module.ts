import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { AppsComponent } from './apps.component';

import { ROUTER_CONFIG } from './apps.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    AppsComponent
  ]
})
export class AppsModule { }

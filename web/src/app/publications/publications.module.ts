import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { PublicationsComponent } from './publications.component';

import { ROUTER_CONFIG } from './publications.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    PublicationsComponent
  ]
})
export class PublicationsModule { }

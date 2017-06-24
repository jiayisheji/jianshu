import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { CollectionsComponent } from './collections.component';

import { ROUTER_CONFIG } from './collections.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    CollectionsComponent
  ]
})
export class CollectionsModule { }

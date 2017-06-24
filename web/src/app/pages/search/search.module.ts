import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { SearchComponent } from './search.component';

import { ROUTER_CONFIG } from './search.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    SearchComponent
  ]
})
export class SearchModule { }

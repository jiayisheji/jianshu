import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqsComponent } from './faqs.component';

import { ROUTER_CONFIG } from './faqs.routes';

@NgModule({
  imports: [
    CommonModule,
    ROUTER_CONFIG
  ],
  declarations: [
    FaqsComponent
  ]
})
export class FaqsModule { }

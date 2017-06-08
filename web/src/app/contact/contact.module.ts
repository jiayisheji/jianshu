import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactComponent } from './contact.component';

import { ROUTER_CONFIG } from './contact.routes';

@NgModule({
  imports: [
    CommonModule,
    ROUTER_CONFIG
  ],
  declarations: [
    ContactComponent
  ]
})
export class ContactModule { }

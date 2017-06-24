import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { BooksComponent } from './books.component';

import { ROUTER_CONFIG } from './books.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    BooksComponent
  ]
})
export class BooksModule { }

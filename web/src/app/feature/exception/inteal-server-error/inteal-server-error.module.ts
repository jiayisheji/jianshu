import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IntealServerErrorRoutingModule } from './inteal-server-error-routing.module';
import { ExceptionComponent } from '../exception/exception.component';
import { IntealServerErrorComponent } from './inteal-server-error.component';

@NgModule({
  imports: [
    CommonModule,
    IntealServerErrorRoutingModule
  ],
  declarations: [ExceptionComponent, IntealServerErrorComponent]
})
export class IntealServerErrorModule { }

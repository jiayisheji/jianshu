import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotFoundRoutingModule } from './not-found-routing.module';
import { ExceptionComponent } from '../exception/exception.component';
import { NotFoundComponent } from './not-found.component';
@NgModule({
  imports: [
    CommonModule,
    NotFoundRoutingModule
  ],
  declarations: [ExceptionComponent, NotFoundComponent]
})
export class NotFoundModule { }

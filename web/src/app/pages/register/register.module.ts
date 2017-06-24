import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

import { ROUTER_CONFIG } from './register.routes';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ROUTER_CONFIG
  ],
  declarations: [
    RegisterComponent
  ]
})
export class RegisterModule { }

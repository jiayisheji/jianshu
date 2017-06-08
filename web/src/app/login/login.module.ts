import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';


import { ROUTER_CONFIG } from './login.routes';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ROUTER_CONFIG
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }

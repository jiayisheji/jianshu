import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './login.component';
import { LoginService } from './login.service';

import { ROUTER_CONFIG } from './login.routes';

@NgModule({
  imports: [
    SharedModule,
    ReactiveFormsModule,
    ROUTER_CONFIG
  ],
  providers: [
    LoginService
  ],
  declarations: [
    LoginComponent
  ]
})
export class LoginModule { }

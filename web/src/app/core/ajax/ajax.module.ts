import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { APP_HTTP_PROVIDERS } from './ajax.service';

@NgModule({
  imports: [
    CommonModule
  ],
  providers: [
    APP_HTTP_PROVIDERS
  ],
  declarations: []
})
export class AjaxModule { }

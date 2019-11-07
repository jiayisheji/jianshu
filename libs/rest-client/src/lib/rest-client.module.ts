import { NgModule } from '@angular/core';
import { HttpClientModule, HttpClientJsonpModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RestClientHttpInterceptors } from './rest-client-interceptors';
import { RestClientService } from './rest-client.service';

@NgModule({
  imports: [
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    RestClientService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RestClientHttpInterceptors,
      multi: true,
    }
  ]
})
export class RestClientModule { }

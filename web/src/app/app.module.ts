import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import {ROUTING} from './app.routes';
// App is our top level component
import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {SharedModule} from './shared';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {APPRequestInterceptor, APPResponseInterceptor} from './app.intercept';

// Application wide providers
const APP_PROVIDERS = [
  {provide: HTTP_INTERCEPTORS, useClass: APPRequestInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: APPResponseInterceptor, multi: true}
];

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    CoreModule,
    SharedModule,
    ROUTING
  ],
  declarations: [
    AppComponent
  ],
  providers: [
    ...APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

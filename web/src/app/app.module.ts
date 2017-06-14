import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTING } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_HTTP_PROVIDERS } from './app.service';
import { CoreModule } from './core';
import { SharedModule } from './shared';

// Application wide providers
const APP_PROVIDERS = [];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule,
    ROUTING
  ],
  providers: [
    ...APP_HTTP_PROVIDERS,
    ...APP_PROVIDERS
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

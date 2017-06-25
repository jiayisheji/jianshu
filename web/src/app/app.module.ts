import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ROUTING } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { CoreModule } from './core';
import { SharedModule } from './shared';

// Application wide providers
const APP_PROVIDERS = [];

@NgModule({
  imports: [
    BrowserModule,
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
export class AppModule { }

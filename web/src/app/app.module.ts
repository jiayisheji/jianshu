import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component
import {AppComponent} from './app.component';
import {CoreModule} from './core';
import {SharedModule} from './shared';

// Application wide providers
const APP_PROVIDERS = [
];

@NgModule({
  imports: [
    BrowserModule,
    CoreModule,
    SharedModule
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

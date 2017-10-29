import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
/*
 * Platform and Environment providers/directives/pipes
 */
// App is our top level component
import { AppComponent } from './app.component';
// App is our top level router
import { AppRoutingModule } from './app-routing.module';
// Application wide core module
import { CoreModule } from './core';
@NgModule({
  imports: [
    BrowserModule,
    AppRoutingModule,
    CoreModule
  ],
  declarations: [
    AppComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}

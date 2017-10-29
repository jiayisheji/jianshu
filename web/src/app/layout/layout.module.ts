import { NgModule } from '@angular/core';
import { SharedModule } from '../shared';
import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';

import { HomeComponent } from '../pages/home';
import { ErrorComponent } from '../pages/error/error.component';
import { NotFoundComponent } from '../pages/not-found/not-found.component';
import { AuthComponent } from './auth/auth.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    HomeComponent,
    ErrorComponent,
    NotFoundComponent,
    AuthComponent
  ],
  exports: [
    LayoutComponent,
    HomeComponent,
    ErrorComponent,
    NotFoundComponent,
    AuthComponent
  ]
})
export class LayoutModule { }

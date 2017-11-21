import { NgModule } from '@angular/core';

import { SharedModule } from '@app/shared';

import { LayoutComponent } from './layout.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  imports: [
    SharedModule
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent
  ]
})
export class LayoutModule { }

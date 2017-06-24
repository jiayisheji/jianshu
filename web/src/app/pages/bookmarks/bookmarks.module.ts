import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { BookmarksComponent } from './bookmarks.component';

import { ROUTER_CONFIG } from './bookmarks.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    BookmarksComponent
  ]
})
export class BookmarksModule { }

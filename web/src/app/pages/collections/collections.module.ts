import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';

import { ROUTER_CONFIG } from './collections.routes';
import {CollectionsNewComponent} from './collections-new/collections-new.component';
import { CollectionsEditComponent } from './collections-edit/collections-edit.component';
import { CollectionsDetailComponent } from './collections-detail/collections-detail.component';
import {CollectionsDetailResolver, CollectionsService} from './collections.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  providers: [
    CollectionsService,
    CollectionsDetailResolver
  ],
  declarations: [
    CollectionsNewComponent,
    CollectionsEditComponent,
    CollectionsDetailComponent
  ]
})
export class CollectionsModule { }

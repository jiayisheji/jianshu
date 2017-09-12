/**
 * Created by Administrator on 2017/5/11.
 */

import {Routes, RouterModule} from '@angular/router';
import {ModuleWithProviders} from '@angular/core';

import {CollectionsDetailComponent} from './collections-detail/collections-detail.component';
import {CollectionsNewComponent} from './collections-new/collections-new.component';
import {CollectionsEditComponent} from './collections-edit/collections-edit.component';
import {CollectionsDetailResolver} from './collections.service';
import {NotFoundComponent} from 'app/shared/not-found/not-found.component';

export const routes: Routes = [
  {
    path: '', component: NotFoundComponent
  },
  {
    path: 'new', component: CollectionsNewComponent
  },
  {
    path: ':id', component: CollectionsDetailComponent,
    resolve: {
      collections: CollectionsDetailResolver
    }
  },
  {
    path: ':id/edit', component: CollectionsEditComponent,
    resolve: {
      collections: CollectionsDetailResolver
    }
  }];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

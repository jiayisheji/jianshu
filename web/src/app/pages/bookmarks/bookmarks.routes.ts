/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { BookmarksComponent } from './bookmarks.component';

export const routes: Routes = [
  { path: '', component: BookmarksComponent }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

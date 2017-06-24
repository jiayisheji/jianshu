/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SearchComponent } from './search.component';
export const routes: Routes = [
  { path: '', component: SearchComponent }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

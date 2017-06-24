/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { PublicationsComponent } from './publications.component';
export const routes: Routes = [
  { path: '', component: PublicationsComponent }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

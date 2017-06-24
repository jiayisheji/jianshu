/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { ArticleComponent } from './article.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
export const routes: Routes = [
  { path: '', component: NotFoundComponent },
  {
    path: ':id', component: ArticleComponent
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

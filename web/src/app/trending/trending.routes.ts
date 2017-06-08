/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { TrendingComponent } from './trending.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';
export const routes: Routes = [
  {
    path: '', component: TrendingComponent,
    children: [
      { path: '', component: NotFoundComponent },
      { path: 'weekly', component: WeeklyComponent},
      { path: 'monthly', component: MonthlyComponent}
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

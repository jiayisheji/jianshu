/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { SubscriptionsComponent } from './subscriptions.component';
import { RecommendationComponent } from './recommendation/recommendation.component';
export const routes: Routes = [
  {
    path: '', component: SubscriptionsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/subscriptions/recommendation' },
      { path: 'recommendation', component: RecommendationComponent}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/subscriptions' }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

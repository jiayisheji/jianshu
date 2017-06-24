/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { RecommendationsComponent } from './recommendations.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';
import { UsersComponent } from './users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { CollectionsComponent } from './collections/collections.component';

export const routes: Routes = [
  {
    path: '', component: RecommendationsComponent,
    children: [
      {path: '', component: NotFoundComponent},
      {path: 'users', component: UsersComponent},
      {path: 'articles', component: ArticlesComponent},
      {path: 'collections', component: CollectionsComponent}
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

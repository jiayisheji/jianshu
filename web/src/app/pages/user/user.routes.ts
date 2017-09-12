/**
 * Created by Administrator on 2017/5/11.
 */
// 导入路由依赖
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// 导入路由页面相关组件
import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/detail.component';
import { UserFollowersComponent } from './followers/followers.component';
import { UserFollowingComponent } from './following/following.component';
import { UserLikedArticleComponent } from './liked-article/liked-article.component';
import { UserSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

import { UserDetailResolver } from './user-detail.service';

export const routes: Routes = [
  { path: '', component: NotFoundComponent },
  {
    path: ':id', component: UserComponent,
    resolve: {
      user: UserDetailResolver
    },
    children: [
      { path: '', component: UserDetailComponent},
      { path: 'followers', component: UserFollowersComponent},
      { path: 'following', component: UserFollowingComponent},
      { path: 'liked_article', component: UserLikedArticleComponent},
      { path: 'subscriptions', component: UserSubscriptionsComponent}
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

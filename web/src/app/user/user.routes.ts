/**
 * Created by Administrator on 2017/5/11.
 */
// 导入路由依赖
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
// 导入路由页面相关组件
import { UserComponent } from './user.component';
import { DetailComponent } from './detail/';
import { FollowersComponent } from './followers/';
import { FollowingComponent } from './following/';
import { LikedArticleComponent } from './liked-article/liked-article.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';
import { NotFoundComponent } from '../shared/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: NotFoundComponent },
  {
    path: ':id', component: UserComponent,
    children: [
      { path: '', component: DetailComponent},
      { path: 'followers', component: FollowersComponent},
      { path: 'following', component: FollowingComponent},
      { path: 'liked_article', component: LikedArticleComponent},
      { path: 'subscriptions', component: SubscriptionsComponent}
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

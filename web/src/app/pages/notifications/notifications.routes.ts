/**
 * Created by Administrator on 2017/5/11.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { NotificationsComponent } from './notifications.component';
import { CommentsComponent } from './comments/comments.component';
import { ChatsComponent } from './chats/chats.component';
import { RequestsComponent } from './requests/requests.component';
import { LikesComponent } from './likes/likes.component';
import { FollowsComponent } from './follows/follows.component';
import { OthersComponent } from './others/others.component';

export const routes: Routes = [
  {
    path: '', component: NotificationsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: '/notifications/comments' },
      { path: 'comments', component: CommentsComponent},
      { path: 'chats', component: ChatsComponent},
      { path: 'requests', component: RequestsComponent},
      { path: 'likes', component: LikesComponent},
      { path: 'follows', component: FollowsComponent},
      { path: 'others', component: OthersComponent}
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/notifications' }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { NotificationsComponent } from './notifications.component';

import { ROUTER_CONFIG } from './notifications.routes';
import { CommentsComponent } from './comments/comments.component';
import { ChatsComponent } from './chats/chats.component';
import { RequestsComponent } from './requests/requests.component';
import { LikesComponent } from './likes/likes.component';
import { FollowsComponent } from './follows/follows.component';
import { OthersComponent } from './others/others.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    NotificationsComponent,
    CommentsComponent,
    ChatsComponent,
    RequestsComponent,
    LikesComponent,
    FollowsComponent,
    OthersComponent
  ]
})
export class NotificationsModule { }

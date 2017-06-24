import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { UserComponent } from './user.component';
import { DetailComponent } from './detail';
import { FollowersComponent } from './followers';
import { FollowingComponent } from './following';
import { ROUTER_CONFIG } from './user.routes';
import { LikedArticleComponent } from './liked-article/liked-article.component';
import { SubscriptionsComponent } from './subscriptions/subscriptions.component';

@NgModule({
  imports: [
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    UserComponent,
    DetailComponent,
    FollowersComponent,
    FollowingComponent,
    LikedArticleComponent,
    SubscriptionsComponent
  ]
})
export class UserModule { }

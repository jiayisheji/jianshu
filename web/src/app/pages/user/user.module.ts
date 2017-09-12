import { NgModule } from '@angular/core';
import { SharedModule } from '../../shared';
import { UserComponent } from './user.component';
import { UserDetailComponent } from './detail/detail.component';
import { UserFollowersComponent } from './followers/followers.component';
import { UserFollowingComponent } from './following/following.component';
import { ROUTER_CONFIG } from './user.routes';
import { UserLikedArticleComponent } from './liked-article/liked-article.component';
import { UserSubscriptionsComponent } from './subscriptions/subscriptions.component';
import { UserDetailResolver } from './user-detail.service';
import {UserService} from './user.service';
@NgModule({
  imports: [
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    UserComponent,
    UserDetailComponent,
    UserFollowersComponent,
    UserFollowingComponent,
    UserLikedArticleComponent,
    UserSubscriptionsComponent
  ],
  providers: [
    UserDetailResolver,
    UserService
  ]
})
export class UserModule { }

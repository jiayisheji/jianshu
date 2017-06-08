import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { SubscriptionsComponent } from './subscriptions.component';

import { ROUTER_CONFIG } from './subscriptions.routes';
import { RecommendationComponent } from './recommendation/recommendation.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    SubscriptionsComponent,
    RecommendationComponent
  ]
})
export class SubscriptionsModule { }

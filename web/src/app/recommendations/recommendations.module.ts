import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { RecommendationsComponent } from './recommendations.component';

import { ROUTER_CONFIG } from './recommendations.routes';
import { UsersComponent } from './users/users.component';
import { ArticlesComponent } from './articles/articles.component';
import { CollectionsComponent } from './collections/collections.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    RecommendationsComponent,
    UsersComponent,
    ArticlesComponent,
    CollectionsComponent
  ]
})
export class RecommendationsModule { }

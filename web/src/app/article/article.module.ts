import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { ArticleComponent } from './article.component';

import { ROUTER_CONFIG } from './article.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    ArticleComponent
  ]
})
export class ArticleModule { }

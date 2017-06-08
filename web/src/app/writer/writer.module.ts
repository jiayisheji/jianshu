import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { WriterComponent } from './writer.component';

import { ROUTER_CONFIG } from './writer.routes';
import { ArticleBooksComponent } from './article-books/article-books.component';
import { RecycleComponent } from './recycle/recycle.component';
import { ArticleComponent } from './article/article.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    WriterComponent,
    ArticleBooksComponent,
    RecycleComponent,
    ArticleComponent
  ]
})
export class WriterModule { }

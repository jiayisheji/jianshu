import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { ArticleComponent } from './article.component';
import { MarkdownToHtmlModule } from 'ng2-markdown-to-html'
import { ROUTER_CONFIG } from './article.routes';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG,
    MarkdownToHtmlModule.forRoot()
  ],
  declarations: [
    ArticleComponent
  ]
})
export class ArticleModule { }

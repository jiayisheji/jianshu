/**
 * Created by Administrator on 2017/5/11.
 */

import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';

import { WriterComponent } from './writer.component';
import { NotFoundComponent } from '../../shared/not-found/not-found.component';

import { ArticleBooksComponent } from './article-books/article-books.component';
import { RecycleComponent } from './recycle/recycle.component';
import { ArticleComponent } from './article/article.component';
export const routes: Routes = [
  {
    path: '', component: WriterComponent,
    children: [
      { path: '', component: NotFoundComponent},
      { path: 'recycle', component: RecycleComponent},
      { path: 'article_books', component: NotFoundComponent,
        children: [
          { path: ':id', component: ArticleBooksComponent,
            children: [
              { path: 'article', component: NotFoundComponent,
                children: [
                  { path: ':id', component: ArticleComponent}
                ]
              },
            ]
          },
        ]
      }
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

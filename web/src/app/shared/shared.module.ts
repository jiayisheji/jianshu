import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';
import { HeaderComponent } from './header';
import { FooterComponent } from './footer';
import { NavbarComponent } from './navbar';
import { NotFoundComponent } from './not-found/not-found.component';
import { ServerErrorComponent } from './server-error/server-error.component';
import { ArticleItemComponent } from './article-item/article-item.component';
import { ArticlePlaceholderComponent } from './article-placeholder/article-placeholder.component';
import { UserPlaceholderComponent } from './user-placeholder/user-placeholder.component';
import { RecommendUsersComponent } from './recommend-users/recommend-users.component';
import { ArticleListComponent } from './article-list/article-list.component';
/**
 * 滚动加载
 */
import { InfinitescrollModule } from '../shared/infinitescroll';

import { DropdownDirective } from '../shared/dropdown/dropdown.directive';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
    InfinitescrollModule
  ],
  declarations: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    NotFoundComponent,
    ServerErrorComponent,
    ArticleItemComponent,
    ArticlePlaceholderComponent,
    UserPlaceholderComponent,
    RecommendUsersComponent,
    ArticleListComponent,
    DropdownDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ArticleItemComponent,
    ArticlePlaceholderComponent,
    UserPlaceholderComponent,
    RecommendUsersComponent,
    ArticleListComponent,
    DropdownDirective
  ]
})
export class SharedModule { }

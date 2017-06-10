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
import { InfinitescrollDirective } from './infinitescroll/infinitescroll.directive';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpModule,
    JsonpModule,
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
    InfinitescrollDirective
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    NavbarComponent,
    ArticleItemComponent,
    ArticlePlaceholderComponent,
    UserPlaceholderComponent,
    RecommendUsersComponent,
    InfinitescrollDirective
  ]
})
export class SharedModule { }

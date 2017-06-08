/**
 * Created by Administrator on 2017/5/11.
 */
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {ServerErrorComponent} from './shared/server-error/server-error.component';

export const ROUTER_CONFIG: Routes = [
  { path: '', loadChildren: 'app/home/home.module#HomeModule' },
  { path: 'login', loadChildren: 'app/login/login.module#LoginModule' },
  { path: 'register', loadChildren: 'app/register/register.module#RegisterModule' },
  { path: 'forget', loadChildren: 'app/forget/forget.module#ForgetModule' },
  { path: 'user', loadChildren: 'app/user/user.module#UserModule' },
  { path: 'settings', loadChildren: 'app/settings/settings.module#SettingsModule' },
  { path: 'bookmarks', loadChildren: 'app/bookmarks/bookmarks.module#BookmarksModule' },
  { path: 'notifications', loadChildren: 'app/notifications/notifications.module#NotificationsModule' },
  { path: 'writer', loadChildren: 'app/writer/writer.module#WriterModule' },
  { path: 'article', loadChildren: 'app/article/article.module#ArticleModule' },
  { path: 'books', loadChildren: 'app/books/books.module#BooksModule' },
  { path: 'collections', loadChildren: 'app/collections/collections.module#CollectionsModule' },
  { path: 'contact', loadChildren: 'app/contact/contact.module#ContactModule' },
  { path: 'help', loadChildren: 'app/help/help.module#HelpModule' },
  { path: 'faqs', loadChildren: 'app/faqs/faqs.module#FaqsModule' },
  { path: 'recommendations', loadChildren: 'app/recommendations/recommendations.module#RecommendationsModule' },
  { path: 'subscriptions', loadChildren: 'app/subscriptions/subscriptions.module#SubscriptionsModule' },
  { path: 'trending', loadChildren: 'app/trending/trending.module#TrendingModule' },
  { path: 'publications', loadChildren: 'app/publications/publications.module#PublicationsModule' },
  { path: 'search', loadChildren: 'app/search/search.module#SearchModule' },
  { path: 'apps', loadChildren: 'app/apps/apps.module#AppsModule' },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  { path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: NotFoundComponent }
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);

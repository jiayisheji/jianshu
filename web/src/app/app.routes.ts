/**
 * Created by Administrator on 2017/5/11.
 */
import { Routes, RouterModule } from '@angular/router';
import {NotFoundComponent} from './shared/not-found/not-found.component';
import {ServerErrorComponent} from './shared/server-error/server-error.component';

export const ROUTER_CONFIG: Routes = [
  { path: '', loadChildren: 'app/pages/home/home.module#HomeModule' },
  { path: 'login', loadChildren: 'app/pages/login/login.module#LoginModule' },
  { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  { path: 'forget', loadChildren: 'app/pages/forget/forget.module#ForgetModule' },
  { path: 'user', loadChildren: 'app/pages/user/user.module#UserModule' },
  { path: 'settings', loadChildren: 'app/pages/settings/settings.module#SettingsModule' },
  { path: 'bookmarks', loadChildren: 'app/pages/bookmarks/bookmarks.module#BookmarksModule' },
  { path: 'notifications', loadChildren: 'app/pages/notifications/notifications.module#NotificationsModule' },
  { path: 'writer', loadChildren: 'app/pages/writer/writer.module#WriterModule' },
  { path: 'article', loadChildren: 'app/pages/article/article.module#ArticleModule' },
  { path: 'books', loadChildren: 'app/pages/books/books.module#BooksModule' },
  { path: 'collections', loadChildren: 'app/pages/collections/collections.module#CollectionsModule' },
  { path: 'contact', loadChildren: 'app/pages/contact/contact.module#ContactModule' },
  { path: 'help', loadChildren: 'app/pages/help/help.module#HelpModule' },
  { path: 'faqs', loadChildren: 'app/pages/faqs/faqs.module#FaqsModule' },
  { path: 'recommendations', loadChildren: 'app/pages/recommendations/recommendations.module#RecommendationsModule' },
  { path: 'subscriptions', loadChildren: 'app/pages/subscriptions/subscriptions.module#SubscriptionsModule' },
  { path: 'trending', loadChildren: 'app/pages/trending/trending.module#TrendingModule' },
  { path: 'publications', loadChildren: 'app/pages/publications/publications.module#PublicationsModule' },
  { path: 'search', loadChildren: 'app/pages/search/search.module#SearchModule' },
  { path: 'apps', loadChildren: 'app/pages/apps/apps.module#AppsModule' },
  { path: '404', component: NotFoundComponent },
  { path: '500', component: ServerErrorComponent },
  //{ path: '', pathMatch: 'full', redirectTo: '/' },
  { path: '**', component: NotFoundComponent }
];

export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);

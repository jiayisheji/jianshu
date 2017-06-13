import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { UTILS_STORAGE_PROVIDERS } from './utils-service/utils.service';
import { ARTICLE_STORAGE_PROVIDERS } from './article-service/article.service';
import { APP_STORAGE_PROVIDERS } from './storage-service/storage.service';
import { AppHttpProvider } from './app-http/apphttp.service';
import { AuthorizationService } from './authorization-service/authorization.service';
import { LoadingModule } from './loading';
@NgModule({
  imports: [
    HttpModule,
    LoadingModule
  ],
  providers: [
    AppHttpProvider,
    AuthorizationService,
    UTILS_STORAGE_PROVIDERS,
    ARTICLE_STORAGE_PROVIDERS,
    APP_STORAGE_PROVIDERS
  ],
  declarations: [],
  exports: [
    LoadingModule
  ]
})
export class CoreModule { }


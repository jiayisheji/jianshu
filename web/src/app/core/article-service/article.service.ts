import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cacheable } from '../storage-service/storage.service';
import { AppHttp, AppHttpProvider, BaseUrl, GET, POST, PUT, DELETE, Query, Path, Body } from  '../../app.service';
export class Article {
  layout: string;
  title: string;
  author: string;
  date: Date;
  comments: boolean;
  categories: string[];
  url: string;
  html: string;
  markdown: string;
}

export interface SearchResult<T> {
    pageSize: number;
    pageIndex: number;
    total: number;
    result: T[];
}


export abstract class ArticleService extends AppHttp {

  abstract getArticles(pageIndex, pageSize, keyword?: string): Observable<SearchResult<Article>>;

  abstract getArticleByUrl(articleUrl: string): Observable<Article>;

  abstract updateMarkdown(articleUrl: string, article: Article): Observable<any> ;

  abstract  deleteArticle(articleUrl: string): Observable<any> ;
}

@Injectable()
export class OnlineArticleService extends ArticleService {

  constructor(protected http: Http, protected appHttpProvider: AppHttpProvider) {
    super();
  }

  @Cacheable({ pool: 'articles' })
  @GET('article')
  getArticles(@Query('pageIndex') pageIndex = 1,
              @Query('pageSize') pageSize = 20,
              @Query('keyword') keyword?: string): Observable<SearchResult<Article>> {
    return null;
  }

  @GET('article/:id')
  getArticleByUrl(@Path('id') articleUrl: string): Observable<Article> {
    return null;
  }

  @POST('article/:id')
  updateMarkdown(@Path('id') articleUrl: string, @Body article: Article): Observable<any> {
    return null;
  }

  @DELETE('article/:id')
  deleteArticle(@Path('id') articleUrl: string): Observable<any> {
    return null;
  }

}


export const ARTICLE_STORAGE_PROVIDERS: Array<any> = [
  {
    provide: ArticleService,
    useClass: OnlineArticleService 
  }
];
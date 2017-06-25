import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Cacheable } from '../storage';
import { AppHttpProvider } from  '../ajax';
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


export abstract class ArticleService {

  abstract getArticles(pageIndex, pageSize, keyword?: string): Observable<SearchResult<Article>>;

  abstract setArticles(body: any): Observable<any>;

}

@Injectable()
export class OnlineArticleService extends ArticleService {

  constructor(protected ajax: AppHttpProvider, private http: Http) {
    super();
  }

  @Cacheable({ pool: 'articles' })
  getArticles(pageIndex = 1, pageSize = 20, keyword?: string): Observable<SearchResult<Article>> {
    return this.ajax.get('/article/5933fa3183e1e940b468743d/conmments', {page: pageIndex, pageSize: pageSize, keyword:keyword});
  }

  setArticles(body): Observable<SearchResult<Article>> {
    return this.ajax.post('/article/5933fa3183e1e940b468743d/conmments', body);
  }
  private handleError(error){
    return error;
  }
}


export const ARTICLE_STORAGE_PROVIDERS: Array<any> = [
  {
    provide: ArticleService,
    useClass: OnlineArticleService
  }
];

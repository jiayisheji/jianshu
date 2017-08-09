import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable()
export class ArticleListService {

  constructor(private http: HttpClient) {
  }

  get (request: string): Observable<any> {
    return this.http.get(`/article${request}`, {})
  }
}

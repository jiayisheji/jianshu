import { Injectable } from '@angular/core';
import {
    Http,
    Jsonp,
    Headers,
    URLSearchParams,
    Request,
    Response,
    RequestMethod,
    RequestOptions,
    RequestOptionsArgs
} from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * 是否是对象
 * @param value
 */
function isObject(value): boolean {
    return value !== null && typeof value === 'object';
}

/**
 * 是否是undefined
 * @param value
 */
function isUndefined(value) {
    return typeof value === 'undefined';
}

/**
 * 是否是空
 * @param value
 */
function isEmpty(value) {
    return isUndefined(value) || value === null || value === '';
}

@Injectable()
export class AppHttpProvider {
    // api请求根地址
    private baseUrl: string;
    private headers: Headers;
    constructor(private http: Http) { }

    // 设置根请求地址
    setBaseUrl(url: string): void{
      if(isEmpty(url)){
        throw Error('没有设置请求地址');
      }
      this.baseUrl = url;
    }

    // 设置 Headers信息
    setHeaders(headers: object = {}): void{
      this.headers = new Headers(headers);
    }

    private getSearch(parame?: object): any{
      let search = new URLSearchParams();
      for(let key of Object.keys(parame)){
        if (isObject(parame[key])) {
          for (let k of parame[key]) {
            if (parame[key].hasOwnProperty(k)) {
              search.set(encodeURIComponent(k), encodeURIComponent(parame[key][k]));
            }
          }
        } else if (!isEmpty(parame[key])) {
          search.set(encodeURIComponent(key), encodeURIComponent(parame[key].toString()));
        } else {
          search.set(encodeURIComponent(key), '');
        }
      }
      search.set(encodeURIComponent('t'), (new Date).getTime().toString());
      return search;
    }

    // get 请求
    // get(url: string, options?: RequestOptionsArgs) : Observable<Response>
    get(url: string, parame?: object, options?: RequestOptionsArgs): Observable<Response> {
        return this.ajax('Get', url, parame, options);
    };

    // post 请求
    // post(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response>
    post(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
      return this.ajax('Post', url, body, options);
    }

    // put 请求
    // put(url: string, body: any, options?: RequestOptionsArgs) : Observable<Response>
    put(url: string, body: any, options?: RequestOptionsArgs): Observable<Response> {
        return this.ajax('Put', url, body, options);
    }

    // delete 请求
   // delete(url: string, options?: RequestOptionsArgs) : Observable<Response>
   delete(url: string, options?: RequestOptionsArgs): Observable<Response> {
        return this.ajax('Delete', url, {}, options);
    }

    private ajax(method: string, url: string, data: object = {}, options?: RequestOptionsArgs){
      let option = new RequestOptions({headers: this.headers});
      let type = method.toLocaleLowerCase();
      if(method === 'Get'){
        option.search = this.getSearch(data);
      }
      option.url = this.baseUrl + url;
      option.method = RequestMethod[method];
      option = Object.assign({}, option, options);
      let parame;
      if(method === 'Get' || method === 'Delete'){
        parame = [option.url, option];
      }else{
        parame = [option.url, data, option];
      }
      return this.http[type](...parame)
        .map(this.done)
        .catch(this.handleError);
    }

  /**
   * 请求成功处理函数
   * @param {Response} res
   * @returns {any|{}}
   */
    private done(res: Response){
      return res.json() || {}
    }

    /**
     * 错误消息拦截
     * @param error
     */
    private handleError(error: Response | any) {
        let errorMessage: string;
        console.log('handleError', error);
        if(error.status === 401){
            errorMessage = "没有权限";
        }
        return errorMessage;
    }
}


export const APP_HTTP_PROVIDERS: Array<any> = [
    {
        provide: AppHttpProvider,
        useClass: AppHttpProvider
    }
];

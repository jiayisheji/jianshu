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
import { AuthorizationService } from '../authorization'
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
    private baseUrl: string = '';
    constructor(private http: Http, private authorizationService: AuthorizationService) { }

    // 设置根请求地址
    setBaseUrl(url: string): void{
      if(isEmpty(url)){
        throw Error('没有设置请求地址');
      }
      this.baseUrl = url;
    }

    // get 请求
    get<T>(url: string, parame?: any, options?: RequestOptions): Observable<T> {
        let headers = new Headers({'Content-Type': 'application/json'});
        const currentUser = <any>this.authorizationService.getCurrentUser();
        if (currentUser && currentUser.token) {
            console.log(currentUser);
            headers = new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + currentUser.token
            });
        }
        let option = new RequestOptions({headers: headers});
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
        option.search = search;
        option.url = this.baseUrl + url;
        option.method = RequestMethod.Get;
        option = Object.assign({}, option, options);

        return this.http.get(option.url)
            .map(this.fun)
            .catch(this.handleError);
    };

    fun(res: Response){
        console.log(res);
        return res.json() || {}
    }

    // post 请求
    post<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
        let headers = new Headers({'Content-Type': 'application/json'});
        const currentUser = <any>this.authorizationService.getCurrentUser();
        if (currentUser && currentUser.token) {
            headers.set('Authorization', 'Bearer ' + currentUser.token)
        }
        let option = new RequestOptions({headers: headers});
        option.method = RequestMethod.Post;
        option.url = this.baseUrl + url;
        option = Object.assign({}, option, options);
        return this.http.post(option.url, body, option)
            .map((res: Response) => res.json() || {})
            .catch(this.handleError);
    }

    // put 请求
    /*put<T>(url: string, body: any, options?: RequestOptions): Observable<T> {
        let option:any = options || {};
        option.method = RequestMethod.Post;
        return this.ajax<T>(url, 'Put', body, option);
    }*/

    // delete 请求
   /* delete<T>(url: string, options?: RequestOptions): Observable<T> {
        let option:any = options || {};
        option.method = RequestMethod.Delete;
        return this.ajax<T>(url, 'Delete', undefined, option);
    }*/

/*    ajax<T>(url: string, method: string, body: any, option?: RequestOptions): Observable<any> {
        let optionsArgs: any = [];
        let headers:any = new Headers({'Content-Type': 'application/json'});
        headers.set('Content-Type', 'application/json')
        const currentUser = <any>this.authorizationService.getCurrentUser();
        if (currentUser && currentUser.token) {
            headers.set('Authorization', 'Bearer ' + currentUser.token)
        }
        let requestMethod = RequestMethod[method];
        let search = option.search;
        console.log(headers);
        let options = new RequestOptions(<any>{
                    method: method,
                    url: this.baseUrl + url,
                    headers,
                    body,
                    search
                });
        if (isUndefined(body)) {
            optionsArgs = [this.baseUrl + url, options];
        } else {
            optionsArgs = [this.baseUrl + url, body, options];
        }
        console.log(options);

        return
    }*/

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

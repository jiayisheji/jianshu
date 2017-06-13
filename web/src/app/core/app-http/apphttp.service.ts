import { Injectable, Optional } from '@angular/core';
import {
    Http,
    Jsonp,
    Headers as ngHeaders,
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
    return typeof value === 'undefined' || value === null || value === '';
}

/**
 * 定义apphttp 接口
 */
export interface AppHttpInterceptor {
    request?: (option: RequestOptions) => RequestOptions | void;
    response?: (response: Observable<any>, request?: RequestOptions) => Observable<any> | void;
}

@Injectable()
export class AppHttpProvider {
    private interceptors: AppHttpInterceptor[];

    constructor() {
        this.interceptors = [];
    }

    /**
     * 获取拦截器
     */
    getInterceptors() {
        return this.interceptors;
    }
    /**
     * 添加拦截器
     * @param interceptor 
     */
    addInterceptor(interceptor: AppHttpInterceptor): AppHttpProvider {
        this.interceptors.push(interceptor);
        return this;
    }
    addRequestInterceptor(interceptor: (res: RequestOptions) => RequestOptions): AppHttpProvider {
        return this.addInterceptor({
            request: (request: RequestOptions): RequestOptions => {
                return interceptor(request) || request;
            }
        });
    }

    addResponseInterceptor(interceptor: (res: any) => any): AppHttpProvider {
        return this.addInterceptor({
            response: (response: Observable<any>): Observable<any> => {
                return response.map(res => {
                    return interceptor(res) || res;
                });
            }
        });
    }

    addResponseErrorInterceptor(interceptor: (res: any) => any): AppHttpProvider {
        return this.addInterceptor({
            response: (response: Observable<any>): Observable<any> => {
                return response.catch(res => {
                    return interceptor(res) || res;
                });
            }
        });
    }


    handleRequest(req: RequestOptions): RequestOptions {
        return this.interceptors
            .filter(item => !!item.request)
            .reduce((req, item) => {
                return <RequestOptions>(item.request(req) || req);
            }, req);
    }

    handleResponse(res: Observable<any>, request?: RequestOptions): Observable<any> {
        return this.interceptors
            .filter(item => !!item.response)
            .reverse()
            .reduce((stream, item) => {
                return <Observable<any>>(item.response(stream, request) || res);
            }, res);
    }

    baseUrl(host: string, excludes: RegExp[] = []): AppHttpProvider {
        this.interceptors.push({
            request: (request: RequestOptions): RequestOptions => {
                if (/^https?:/.test(request.url)) {
                    return request;
                }

                let excludeUrl = excludes.some(t => t.test(request.url));
                if (excludeUrl) {
                    return request;
                }

                host = host.replace(/\/$/, "");
                let url = request.url.replace(/^\//, "");
                request.url = `${host}/${url}`;
                return request;
            }
        });
        return this;
    }

    /**
     * 头信息
     * @param headers 
     */
    headers(headers = {}): AppHttpProvider {
        return this.addInterceptor({
            request: (request: RequestOptions): void => {
                request.headers = request.headers || new ngHeaders();
                for (let key in headers) {
                    if (headers.hasOwnProperty(key)) {
                        request.headers.set(key, headers[key]);
                    }
                }
            }
        });
    }

    json(): AppHttpProvider {
        this.interceptors.push({
            request: (request: RequestOptions): void => {
                request.headers = request.headers || new ngHeaders();
                request.headers.set('Content-Type', 'application/json');
                request.headers.set('Accept', 'application/json, text/javascript, */*;');

                if (request.body) {
                    request.body = JSON.stringify(request.body);
                }
            },
            response: (response: Observable<any>): Observable<any> => {
                return response.map(res => {
                    let type = res.headers.get('Content-Type') || res.headers.get('content-type');
                    if (type && type.indexOf('json') !== -1) {
                        return res.json && res.json();
                    }
                });
            }
        });
        return this;
    }
}
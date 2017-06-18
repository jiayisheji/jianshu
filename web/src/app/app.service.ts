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
    /**
     * 添加请求拦截
     */
    addRequestInterceptor(interceptor: (res: RequestOptions) => RequestOptions): AppHttpProvider {
        return this.addInterceptor({
            request: (request: RequestOptions): RequestOptions => {
                return interceptor(request) || request;
            }
        });
    }
    /**
     * 添加响应拦截
     */
    addResponseInterceptor(interceptor: (res: any) => any): AppHttpProvider {
        return this.addInterceptor({
            response: (response: Observable<any>): Observable<any> => {
                return response.map(res => {
                    return interceptor(res) || res;
                });
            }
        });
    }
    /**
     * 添加响应错误拦截
     */
    addResponseErrorInterceptor(interceptor: (res: any) => any): AppHttpProvider {
        return this.addInterceptor({
            response: (response: Observable<any>): Observable<any> => {
                return response.catch(res => {
                    return interceptor(res) || res;
                });
            }
        });
    }
    /**
     * 处理请求
     * @param req 请求参数
     */
    handleRequest(req: RequestOptions): RequestOptions {
        return this.interceptors
            .filter(item => !!item.request)
            .reduce((req, item) => {
                return <RequestOptions>(item.request(req) || req);
            }, req);
    }
    /**
     * 处理响应
     * @param res 
     * @param request 
     */
    handleResponse(res: Observable<any>, request?: RequestOptions): Observable<any> {
        return this.interceptors
            .filter(item => !!item.response)
            .reverse()
            .reduce((stream, item) => {
                return <Observable<any>>(item.response(stream, request) || res);
            }, res);
    }
    /**
     * 设置api请求地址
     * @param host     api地址
     * @param excludes 正则表达式 
     */
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
    /**
     * 数据json格式
     */
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


export class AppHttp {
    protected http: Http;
    protected jsonp: Jsonp;
    protected appHttpProvider: AppHttpProvider;

    constructor(option?: { http?: Http, jsonp?: Jsonp, appHttpProvider ?: AppHttpProvider }) {
        if (option) {
            this.http = option.http;
            this.jsonp = option.jsonp;
            this.appHttpProvider = option.appHttpProvider;
        }
    }

    protected getBaseUrl(): string {
        return '';
    }

    protected getDefaultHeaders(): Object {
        return null;
    }

    protected  requestInterceptor(req: RequestOptions): RequestOptions | void {
        if (this.appHttpProvider) {
            return this.appHttpProvider.handleRequest(req);
        }
        return req;
    }

    protected responseInterceptor(res: Observable < any >, request?: RequestOptions): Observable < any > | void {
        if (this.appHttpProvider) {
            return this.appHttpProvider.handleResponse(res, request);
        }

        return res;
    }

}

export class AppHttpService {

    enableJson: boolean;

    constructor(private http: Http, @Optional() private appHttpProvider: AppHttpProvider) {

    }

    request<T>(url: string | Request, options?: RequestOptionsArgs): Observable<T> {
        const requestOptions = new RequestOptions(options);
        if (!(url instanceof Request)) {
            requestOptions.url = url;
        }
        return this.handleRequest(requestOptions);
    }

    get<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Get;
        return this.request<T>(url, options);
    }

    post<T>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Post;
        options.body = body;
        return this.request<T>(url, options);
    }


    put<T>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Put;
        options.body = body;
        return this.request<T>(url, options);
    }

    delete<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Delete;
        return this.request<T>(url, options);
    }

    patch<T>(url: string, body: any, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Patch;
        options.body = body;
        return this.request<T>(url, options);
    }

    head<T>(url: string, options?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Head;
        return this.request<T>(url, options);
    }

    options<T>(url: string, options ?: RequestOptionsArgs): Observable<T> {
        options = options || {};
        options.method = RequestMethod.Options;
        return this.request<T>(url, options);
    }

    protected  requestInterceptor(req: RequestOptions): RequestOptions | void {
        if (this.appHttpProvider) {
            return this.appHttpProvider.handleRequest(req);
        }
        return req;
    }

    protected responseInterceptor(res: Observable <any>, request?: RequestOptions): Observable <any> | void {
        if (this.appHttpProvider) {
            return this.appHttpProvider.handleResponse(res, request);
        }

        return res;
    }

    private handleRequest<T>(requestOptions: RequestOptions): Observable<T> {
        requestOptions = this.requestInterceptor(requestOptions) || requestOptions;
        let observable = this.http.request(new Request(requestOptions));
        if (this.enableJson) {
            observable = observable.map(res => res.json());
        }
        return this.responseInterceptor(observable, requestOptions) || observable;
    }

}

export function BaseUrl(url: string) {
    return function <TFunction extends Function>(target: TFunction): TFunction {
        target.prototype.getBaseUrl = function () {
            return url;
        };
        return target;
    };
}

export function DefaultHeaders(headers: any) {
    return function <TFunction extends Function>(target: TFunction): TFunction {
        target.prototype.getDefaultHeaders = function () {
            return headers;
        };
        return target;
    };
}

export function Headers(headersDef: any) {
    return function (target: AppHttp, propertyKey: string, descriptor: any) {
        descriptor.headers = headersDef;
        return descriptor;
    };
}


function paramBuilder(paramName: string, optional = false) {
    return function (key?: string) {
        if (!optional && !key) {
            throw new Error(`${paramName} Key is required!`);
        }
        return function (target: AppHttp, propertyKey: string | symbol, parameterIndex: number) {
            let metadataKey = `${propertyKey}_${paramName}_parameters`;
            let paramObj: any = {
                key: key,
                parameterIndex: parameterIndex
            };
            if (Array.isArray(target[metadataKey])) {
                target[metadataKey].push(paramObj);
            } else {
                target[metadataKey] = [paramObj];
            }
        };
    };
}

export var Path = paramBuilder("Path");

export var Query = paramBuilder("Query", true);

export var Body = paramBuilder("Body")("Body");

export var Header = paramBuilder("Header");

export function Produces(producesDef: string) {
    return function (target: AppHttp, propertyKey: string, descriptor: any) {
        descriptor.enableJson = producesDef.toLocaleLowerCase() === 'json';
        return descriptor;
    };
}


function methodBuilder(method: number, isJsonp = false) {
    return function (url: string) {
        return function (target: AppHttp, propertyKey: string, descriptor: any) {

            let pPath = target[`${propertyKey}_Path_parameters`];
            let pQuery = target[`${propertyKey}_Query_parameters`];
            let pBody = target[`${propertyKey}_Body_parameters`];
            let pHeader = target[`${propertyKey}_Header_parameters`];
            
            descriptor.value = function (...args: any[]) {

                // Body
                let body = "";
                if (pBody) {
                    let reqBody = args[pBody[0].parameterIndex];
                    body = descriptor.enableJson ? JSON.stringify(reqBody) : reqBody;
                }

                // Path
                let resUrl: string = url;
                if (pPath) {
                    for (let k in pPath) {
                        if (pPath.hasOwnProperty(k)) {
                            resUrl = resUrl.replace(`:${pPath[k].key}`, encodeURIComponent(args[pPath[k].parameterIndex]));
                        }
                    }
                }

                // Query
                let search = new URLSearchParams();
                if (pQuery) {
                    pQuery
                        .filter(p => !isUndefined(args[p.parameterIndex]))
                        .forEach(p => {
                            let key = p.key;
                            let value = args[p.parameterIndex];

                            if (value instanceof Date) {
                                search.set(encodeURIComponent(key), encodeURIComponent((<Date>value).getTime().toString()));
                            } else if (isObject(value)) {
                                for (let k in value) {
                                    if (value.hasOwnProperty(k)) {
                                        search.set(encodeURIComponent(k), encodeURIComponent(value[k]));
                                    }
                                }
                            } else if (!isEmpty(value)) {
                                search.set(encodeURIComponent(key), encodeURIComponent(value.toString()));
                            } else {
                                search.set(encodeURIComponent(key), '');
                            }
                        });
                }

                // Headers
                // set class default headers
                let headers = new ngHeaders(this.getDefaultHeaders());
                // set method specific headers
                for (let k in descriptor.headers) {
                    if (descriptor.headers.hasOwnProperty(k)) {
                        headers.append(k, descriptor.headers[k]);
                    }
                }

                if (pHeader) {
                    for (let k in pHeader) {
                        if (pHeader.hasOwnProperty(k)) {
                            headers.append(pHeader[k].key, args[pHeader[k].parameterIndex]);
                        }
                    }
                }

                let baseUrl = this.getBaseUrl();
                let host = baseUrl ? baseUrl.replace(/\/$/, "") + '/' : '';
                let options = new RequestOptions(<any>{
                    method,
                    url: `${host}${resUrl.replace(/^\//, "")}`,
                    headers,
                    body,
                    search
                });

                options = this.requestInterceptor(options) || options;
                let httpRequest = isJsonp ? this.jsonp : this.http;
                if (!httpRequest) {
                    throw 'Http or jsonp should at less passs one of them!';
                }
                let observable: Observable<Response> = httpRequest.request(new Request(options));
                // @Produces
                if (descriptor.enableJson) {
                    observable = observable.map(res => res.json());
                }
                return this.responseInterceptor(observable, options) || observable;
            };

            return descriptor;
        };
    };
}

export const GET = methodBuilder(RequestMethod.Get);

export const JSONP = methodBuilder(RequestMethod.Get, true);

export const POST = methodBuilder(RequestMethod.Post);

export const PUT = methodBuilder(RequestMethod.Put);

export const DELETE = methodBuilder(RequestMethod.Delete);

export const HEAD = methodBuilder(RequestMethod.Head);

export const PATCH = methodBuilder(RequestMethod.Patch);


export const APP_HTTP_PROVIDERS: Array<any> = [
    AppHttpProvider
];
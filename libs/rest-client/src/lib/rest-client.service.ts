import { Injectable } from '@angular/core';
import { HttpRequest, HttpEvent, HttpErrorResponse, HttpResponse } from '@angular/common/http';

export interface RESTClientHttpInterceptor {
  request?: (option: HttpRequest<any>) => HttpRequest<any> | void;
  response?: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>) => HttpEvent<any> | void;
}
/**
 * @description RestClient服务
 * @export
 * @class RestClientService
 */
@Injectable()
export class RestClientService {
  /**
   * @description 拦截器集合
   * @private
   * @type {RESTClientHttpInterceptor[]}
   * @memberof RestClientService
   */
  private readonly interceptors: RESTClientHttpInterceptor[] = [];
  constructor() { }

  /**
   * @description 返回所有拦截器
   * @returns {RESTClientHttpInterceptor[]}
   * @memberof RestClientService
   */
  getInterceptors(): RESTClientHttpInterceptor[] {
    return this.interceptors;
  }

  /**
   * @description 添加拦截器
   * @param {RESTClientHttpInterceptor} interceptor
   * @returns {ThisType<RestClientService>}
   * @memberof RestClientService
   */
  addInterceptor(interceptor: RESTClientHttpInterceptor): ThisType<RestClientService> {
    this.interceptors.push(interceptor);
    return this;
  }

  /**
   * @description 添加请求拦截器
   * @param {(res: HttpRequest<any>) => HttpRequest<any>} interceptor
   * @returns {RESTClientService}
   * @memberof RestClientService
   */
  addRequestInterceptor(interceptor: (res: HttpRequest<any>) => HttpRequest<any>): ThisType<RestClientService> {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        return interceptor(request) || request;
      }
    });
  }

  /**
   * @description 添加响应拦截器
   * @param {(res: any, request?: HttpRequest<any>) => any} interceptor
   * @returns {ThisType<RestClientService>}
   * @memberof RestClientService
   */
  addResponseInterceptor(interceptor: (res: any, request?: HttpRequest<any>) => any): ThisType<RestClientService> {
    return this.addInterceptor({
      response: (response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> | void => {
        return interceptor(response, request) || response;
      }
    });
  }

  /**
   * @description 添加响应成功拦截器 2xx or 3xx
   * @param {(res: any, request?: HttpRequest<any>) => any} interceptor
   * @returns {ThisType<RestClientService>}
   * @memberof RestClientService
   */
  addResponseSuccessInterceptor(interceptor: (res: any, request?: HttpRequest<any>) => any): ThisType<RestClientService> {
    return this.addInterceptor({
      response: (response: HttpEvent<any> | HttpResponse<any>, request?: HttpRequest<any>): HttpEvent<any> | void => {
        if (response instanceof HttpResponse) {
          return interceptor(response, request) || response;
        }
      }
    });
  }

  /**
   * @description 添加响应失败拦截器 4xx or 5xx
   * @param {(res: any, request?: HttpRequest<any>) => any} interceptor
   * @returns {RESTClientService}
   * @memberof RestClientService
   */
  addResponseErrorInterceptor(interceptor: (res: any, request?: HttpRequest<any>) => any): ThisType<RestClientService> {
    return this.addInterceptor({
      response: (response: HttpEvent<any> | HttpErrorResponse, request?: HttpRequest<any>): HttpEvent<any> | void => {
        if (response instanceof HttpErrorResponse) {
          return interceptor(response, request) || response;
        }
      }
    });
  }

  /**
   * @description 请求处理
   * @param {HttpRequest<any>} request
   * @returns {HttpRequest<any>}
   * @memberof RestClientService
   */
  handleRequest(request: HttpRequest<any>): HttpRequest<any> {
    return this.interceptors
      .filter(item => !!item.request)
      .reduce((httpEvent, item) => {
        return (item.request(httpEvent) || httpEvent);
      }, request);
  }

  /**
   * @description 响应处理
   * @param {HttpEvent<any>} response
   * @param {HttpRequest<any>} [request]
   * @returns {HttpEvent<any>}
   * @memberof RestClientService
   */
  handleResponse(response: HttpEvent<any>, request?: HttpRequest<any>): HttpEvent<any> {
    return this.interceptors
      .filter(item => !!item.response)
      .reverse()
      .reduce((httpEvent, item) => {
        return item.response(httpEvent, request) || httpEvent;
      }, response);
  }

  /**
   * @description 设置接口全局前缀
   * @param {string} host 根路径
   * @param {RegExp[]} [excludes=[]] 排除前缀
   * @returns {ThisType<RestClientService>}
   * @memberof RestClientService
   */
  setGlobalPrefix(host: string, excludes: RegExp[] = []): ThisType<RestClientService> {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url) || !request.url.startsWith('/')) {
          return request;
        }

        const excludeUrl = excludes.some(t => t.test(request.url));
        if (excludeUrl) {
          return request;
        }

        const url = host.replace(/\/$/, '') + request.url;
        return request.clone({ url });
      }
    });
    return this;
  }

  /**
   * @description 设置静态资源前缀
   * @param {string} host 根路径
   * @param {RegExp[]} [include=[]] 包含前缀
   * @returns {RESTClientService}
   * @memberof RestClientService
   */
  setStaticAssets(host: string, include: RegExp[] = []): ThisType<RestClientService> {
    this.interceptors.push({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        if (/^https?:/.test(request.url) || !request.url.startsWith('~')) {
          return request;
        }

        const excludeUrl = include.some(t => t.test(request.url));
        if (!excludeUrl) {
          return request;
        }

        const url = host.replace(/\/$/, '') + request.url.substr(1);
        return request.clone({ url });
      }
    });
    return this;
  }

  /** 设置请求头信息 */
  headers(headers: Record<string, string | string[]> = {}, override = false): ThisType<RestClientService> {
    return this.addInterceptor({
      request: (request: HttpRequest<any>): HttpRequest<any> => {
        let setHeaders = headers;
        if (request.headers) {
          setHeaders = Object.keys(headers).reduce((obj, key) => {
            if (override || !request.headers.has(key)) {
              obj[key] = headers[key];
            }
            return obj;
          }, {});
        }

        return request.clone({ setHeaders });
      }
    });
  }
}

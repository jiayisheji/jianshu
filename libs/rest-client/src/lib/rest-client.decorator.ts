import { isNullOrUndefined, isString, isUndefined } from 'util';
import { CONTROLLER_PATH, RestClientPropertyDescriptor } from './constant';
import { createParamDecorator, createMappingDecorator } from './builder';
import { HttpParams, HttpHeaders } from '@angular/common/http';
import { RestClient } from './rest-client';
import { Observable } from 'rxjs';

/**
 * @description 为REST类设置自定义控制器
 * @export
 * @param {string|{prefix?: string,baseUrl?: string,headers?: Record<string, string | string[]>}} args
 * @returns {ClassDecorator}
 */
export function Controller(args: string): ClassDecorator;
// tslint:disable-next-line:unified-signatures
export function Controller(args: {
  prefix?: string,
  baseUrl?: string,
  headers?: HttpHeaders | Record<string, string | string[]>
}): ClassDecorator;
export function Controller(args: string | {
  prefix?: string,
  baseUrl?: string,
  headers?: HttpHeaders | Record<string, string | string[]>
}): ClassDecorator {
  let path: string;
  let baseUrl: string;
  let headers: HttpHeaders | Record<string, string | string[]>
  if (isString(args)) {
    path = ('/' + args).replace(/\/\//, '/');
  } else {
    path = isString(args.prefix) ? ('/' + args.prefix).replace(/\/\//, '/') : '';
    baseUrl = isString(args.baseUrl) ? args.baseUrl.replace(/\/$/, '') + '/' : '';
    headers = args.headers;
  }
  return <TFunction extends Function>(Target: TFunction): TFunction => {
    if (path) {
      Target[CONTROLLER_PATH] = path;
    }
    if (baseUrl) {
      Target.prototype.getBaseUrl = function () {
        return baseUrl;
      }
    }
    if (headers) {
      Target.prototype.getDefaultHeaders = function () {
        return headers;
      }
    }
    return Target;
  };
}


/**
 * @description 为REST方法设置自定义头
 * @export
 * @param {*} headersDef
 * @returns
 */
export function Headers(headersDef: Record<string, string | string[]>): MethodDecorator {
  return function (target: RestClient, propertyKey: string, descriptor: RestClientPropertyDescriptor) {
    descriptor.headers = headersDef;
    return descriptor;
  };
}

/**
 * @description 为REST方法设请求超时
 * @export
 * @param {number} timeout 秒
 * @returns {MethodDecorator}
 */
export function Timeout(timeout: number): MethodDecorator {
  return function (target: RestClient, propertyKey: string, descriptor: RestClientPropertyDescriptor) {
    if (!descriptor.timeout) {
      descriptor.timeout = [];
    }
    descriptor.timeout.push(timeout * 1e3);
    return descriptor;
  };
}

export function Emitter<T>(emitter: (resp: Observable<any>) => Observable<any>): MethodDecorator {
  return function (target: RestClient, propertyKey: string, descriptor: RestClientPropertyDescriptor) {
    if (!descriptor.emitters) {
      descriptor.emitters = [];
    }
    descriptor.emitters.push(emitter);
    return descriptor;
  };
}

export function Mapper(mapper: (resp: any) => any): MethodDecorator {
  return function (target: RestClient, propertyKey: string, descriptor: RestClientPropertyDescriptor) {
    if (!descriptor.mappers) {
      descriptor.mappers = [];
    }
    descriptor.mappers.push(mapper);
    return descriptor;
  };
}

export function RequestOptions(options: {
  headers?: HttpHeaders | Record<string, string | string[]>,
  observe?: 'body' | 'response' | string,
  params?: HttpParams | Record<string, string | string[]>;
  reportProgress?: boolean,
  responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
  withCredentials?: boolean
}): MethodDecorator {
  return function (target: RestClient, propertyKey: string, descriptor: RestClientPropertyDescriptor) {
    options.observe = options.observe || 'body';
    options.reportProgress = isUndefined(options.reportProgress) ? false : options.reportProgress;
    options.responseType = options.responseType || 'json';
    options.withCredentials = isUndefined(options.withCredentials) ? false : options.withCredentials;

    descriptor.requestOptions = options;
    return descriptor;
  };
}

/**
 * Get method
 * @param {string} url - Routes HTTP GET requests to the specified path.
 */
export const Get = createMappingDecorator('GET');

/**
 * Post method
 * @param {string} url - Routes HTTP POST requests to the specified path.
 */
export const Post = createMappingDecorator('POST');

/**
 * Put method
 * @param {string} url - Routes HTTP PUT requests to the specified path.
 */
export const Put = createMappingDecorator('PUT');

/**
 * Delete method
 * @param {string} url - Routes HTTP DELETE requests to the specified path.
 */
export const Delete = createMappingDecorator('DELETE');

/**
 * Patch method
 * @param {string} url - Routes HTTP PATCH requests to the specified path.
 */
export const Patch = createMappingDecorator('PATCH');

/**
 * Options method
 * @param {string} url - Routes HTTP OPTIONS requests to the specified path.
 */
export const Options = createMappingDecorator('OPTIONS');

/**
 * Head method
 * @param {string} url - Routes HTTP HEAD requests to the specified path.
 */
export const Head = createMappingDecorator('HEAD');

/**
 * Jsonp method
 * @param {string} url - Routes HTTP JSONP requests to the specified path.
 */
export const Jsonp = createMappingDecorator('JSONP');


/**
 * Param param
 * @param {string} url - Routes HTTP JSONP requests to the specified path.
 */
export const Param = createParamDecorator('Param');
/**
 * Query param
 * @param {string} url - Routes HTTP JSONP requests to the specified path.
 */
export const Query = createParamDecorator('Query');

/**
 * Body param
 * @param {string} url - Routes HTTP JSONP requests to the specified path.
 */
export const Body = createParamDecorator('Body')('Body');

/**
 * Header param
 * @param {string} url - Routes HTTP JSONP requests to the specified path.
 */
export const Header = createParamDecorator('Header');

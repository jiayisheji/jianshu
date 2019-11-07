import { RequestParams, DecoratorParameters, RequestMethods, CONTROLLER_PATH, RestClientPropertyDescriptor } from './constant';
import { RestClient } from './rest-client';
import { HttpParams, HttpHeaders, HttpRequest, HttpEvent, HttpClient } from '@angular/common/http';
import { isUndefined, isObject } from 'util';
import { Observable } from 'rxjs';
import { timeout, map } from 'rxjs/operators';

export const createParamDecorator = (params: RequestParams) => {
  return (key?: string) => {
    return function (target: RestClient, propertyKey: string, paramIndex: number) {
      const metadataKey = `__${propertyKey}_${params}_parameters__`;
      const paramObj: DecoratorParameters = {
        key,
        paramIndex
      };
      if (Array.isArray(target[metadataKey])) {
        target[metadataKey].push(paramObj);
      } else {
        target[metadataKey] = [paramObj];
      }
    };
  };
};


export const createMappingDecorator = (method: RequestMethods) => (
  path: string = '',
): MethodDecorator => {
  return requestMapping(path, method);
};

function requestMapping(url: string, method: RequestMethods) {
  return function (target: RestClient, methodName: string, descriptor: RestClientPropertyDescriptor) {
    const pParam: DecoratorParameters[] = target[`${methodName}_Param_parameters`];
    const pQuery: DecoratorParameters[] = target[`${methodName}_Query_parameters`];
    const pBody: DecoratorParameters[] = target[`${methodName}_Body_parameters`];
    const pHeader: DecoratorParameters[] = target[`${methodName}_Header_parameters`];
    const baseUrl: string = target.getBaseUrl();
    const controllerPath: string = target[CONTROLLER_PATH] || '';
    // 处理 url
    if (!url && (!controllerPath || !/^\/[a-z]+/.test(controllerPath))) {
      throw new Error('The url cannot be empty');
    }
    // 静态资源前缀直接跳过
    if (!url.startsWith('~/')) {
      if (url.startsWith('^/')) { // 跳出当前控制器处理
        url = url.substr(1);
      } else if (url.startsWith('/')) { // 当前控制器处理
        url = controllerPath + url;
      } else if (url === '') {  // 空方法处理
        url = controllerPath;
      } else {
        throw new Error('Unable to process url');
      }
      // 处理自定义api根地址
      if (baseUrl) {
        url = baseUrl + url;
      }
    }
    descriptor.value = function (...args: any[]) {
      // Body
      // 一个请求有且只有一个body
      let body = null;
      if (pBody) {
        body = args[pBody[0].paramIndex];
      }
      // Param
      // 可能存在多个Param
      if (pParam) {
        pParam.forEach((param: DecoratorParameters) => {
          url = url.replace(`:${param.key}`, encodeURIComponent(args[param.paramIndex]));
        });
      }

      // Query
      // 可能存在多个Query
      let params = new HttpParams();
      if (pQuery) {
        params = pQuery
          .filter((param: DecoratorParameters) => !isUndefined(args[param.paramIndex]))
          .reduce((results: HttpParams, param: DecoratorParameters) => {
            const key = param.key;
            const value = args[param.paramIndex];
            let result = results;
            if (value instanceof Date) {
              result = result.set(key, (<Date>value).getTime().toString());
            } else if (Array.isArray(value)) {
              result = result.set(key, value.map((item) => item).join(','));
            } else if (isObject(value)) {
              for (const k in value) {
                if (value.hasOwnProperty(k) && !isUndefined(value[k])) {
                  result = result.set(k, value[k]);
                }
              }
            } else if (!(!value && value !== 0)) {
              result = result.set(key, value.toString());
            } else {
              result = result.set(key, '');
            }
            return result;
          }, params);
      }

      // Headers
      // set Class default headers
      let headers = new HttpHeaders(this.getDefaultHeaders());
      // set Method specific headers
      const methodHeader: Record<string, string | string[]> = descriptor.headers || {};
      Object.keys(methodHeader).forEach((key) => {
        headers = headers.append(key, methodHeader[key]);
      });
      // set Method parameters specific headers
      if (pHeader) {
        pHeader.forEach((header: DecoratorParameters) => {
          headers = headers.append(header.key, args[header.paramIndex]);
        });
      }

      // set Method requestOptions specific headers and params
      const methodOptions = descriptor.requestOptions;
      if (methodOptions) {
        const methodOptionsHeaders = methodOptions.headers || {};
        Object.keys(methodOptionsHeaders).forEach((key) => {
          headers = headers.append(key, methodOptionsHeaders[key]);
        });
        const methodOptionsParams = methodOptions.params || {};
        Object.keys(methodOptionsParams).forEach((key) => {
          params = params.append(key, methodOptionsParams[key]);
        });
      }

      // 请求配置
      let request: HttpRequest<any> = new HttpRequest(method, url, body, {
        headers: headers,
        params: params,
        withCredentials: methodOptions ? methodOptions.withCredentials : false,
        reportProgress: methodOptions ? methodOptions.reportProgress : false,
        responseType: methodOptions ? methodOptions.responseType : 'json',
      });

      // intercept the request
      request = this.requestInterceptor(request);

      // 创建请求
      let observable: Observable<HttpEvent<any>> = (this.http as HttpClient).request(request);

      if (descriptor.timeout) {
        descriptor.timeout.forEach((duration: number) => {
          observable = observable.pipe(timeout(duration));
        });
      }

      if (descriptor.mappers) {
        descriptor.mappers.forEach((mapper: (resp: any) => any) => {
          observable = observable.pipe(map(mapper));
        });
      }

      if (descriptor.emitters) {
        descriptor.emitters.forEach((handler: (resp: Observable<any>) => Observable<any>) => {
          observable = handler(observable);
        });
      }

      // intercept the response
      observable = this.responseInterceptor(observable);

      return observable;
    }
    return descriptor;
  }
}

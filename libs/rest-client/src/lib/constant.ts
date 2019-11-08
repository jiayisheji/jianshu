import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export const CONTROLLER_PATH = '__controller_path__';

/**
 * @description 请求方式
 */
export type RequestMethods = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS' | 'HEAD' | 'PATCH' | 'JSONP';

/**
 * @description 请求参数类型
 */
export type RequestParams = 'Param' | 'Query' | 'Body' | 'Header';

export interface DecoratorParameters {
  key: string;
  paramIndex: number;
}


export interface RestClientPropertyDescriptor extends TypedPropertyDescriptor<any> {
  headers: Record<string, string | string[]>;
  timeout: number[];
  emitters: Array<(resp: Observable<any>) => Observable<any>>;
  mappers: Array<(resp: any) => any>;
  requestOptions: {
    headers?: HttpHeaders | Record<string, string | string[]>,
    observe?: 'body' | 'response' | string,
    params?: HttpParams | Record<string, string | string[]>;
    reportProgress?: boolean,
    responseType?: 'arraybuffer' | 'blob' | 'json' | 'text',
    withCredentials?: boolean
  };
}

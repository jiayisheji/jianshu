import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * @description RESTClient
 * @export
 * @abstract
 * @class RestClient
 */
export abstract class RestClient {
  constructor(
    protected http: HttpClient
  ) { }

  /**
   * @description 根地址
   * @returns {string}
   * @memberof RestClient
   */
  public getBaseUrl(): string {
    return '';
  }

  /**
   * @description 默认头信息
   * @returns {Record<string, string | string[]>}
   * @memberof RestClient
   */
  public getDefaultHeaders(): Record<string, string | string[]> {
    return null;
  }

  /**
   * @description Request Interceptor
   * @protected
   * @param {Request} req
   * @returns
   * @memberof RESTClient
   */
  protected requestInterceptor(req: Request) {
    return req;
  }

  /**
   * @description Response Interceptor
   * @protected
   * @param {Observable<any>} res
   * @returns {Observable<any>}
   * @memberof RESTClient
   */
  protected responseInterceptor(res: Observable<any>): Observable<any> {
    return res;
  }
}

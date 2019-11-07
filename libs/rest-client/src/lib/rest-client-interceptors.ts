import { HttpInterceptor, HttpRequest, HttpHandler, HttpSentEvent, HttpHeaderResponse, HttpProgressEvent, HttpResponse, HttpUserEvent, HttpEventType } from '@angular/common/http';
import { RestClientService } from './rest-client.service';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

@Injectable()
export class RestClientHttpInterceptors implements HttpInterceptor {
  constructor(private restClient: RestClientService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<
    HttpSentEvent | HttpHeaderResponse | HttpProgressEvent | HttpResponse<any> | HttpUserEvent<any>> {
    const httpRequest = this.restClient.handleRequest(req);
    return next.handle(httpRequest)
      .pipe(
        map(response => {
          if ([HttpEventType.Response, HttpEventType.ResponseHeader].indexOf(response.type) !== -1) {
            return (this.restClient.handleResponse(response, httpRequest) || response);
          }
          return response;
        }),
        catchError(error => throwError(this.restClient.handleResponse(error, httpRequest) || error))
      );
  }

}

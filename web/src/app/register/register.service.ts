import { Injectable }              from '@angular/core';
import { Http, Response }          from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
@Injectable()
export class RegisterService {
  private registerUrl = 'http://localhost:3000/api/v1/register';  // URL to web API
  constructor (private http: Http) {}
  register(data: any): Observable<any> {
    return this.http.post(this.registerUrl, data)
                    .map(this.extractData)
                    .catch(this.handleError);
  }
  private extractData(res: Response) {
    return res.json() || {};
  }
  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
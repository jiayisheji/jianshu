import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import {HttpClient, HttpParams} from '@angular/common/http';
import {AuthorizationService} from '../../core/authorization/authorization.service';

@Injectable()
export class RegisterService {
  constructor(private http: HttpClient, private authorizationService: AuthorizationService) {
  }

  register(data: any): Observable<any> {
    const authorizationService = this.authorizationService;
    return this.http.post('/register', data).map((user: any) => {
      authorizationService.setCurrentUser(user.data);
      return user;
    });
  }

  sendCode(data: any): Observable<any> {
    return this.http.post('/send_code', data).map((code: any) => {
      return code;
    });
  }

}

import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../core/authorization-service/authorization.service';
import { AppHttpProvider } from '../core/app-http/apphttp.service';
import { Http } from '@angular/http';

@Injectable()
export class LoginService {

  constructor(protected  http: Http,
              protected appHttpProvider: AppHttpProvider,
              private authorizationService: AuthorizationService) {
  }
  /**
   * 登录
   * @param loginInfo 
   */
  login(loginInfo: {username: string; password: string }): Observable<any> {
    const authorizationService = this.authorizationService;
    const appHttpProvider = this.appHttpProvider;

    return this.http.post('login', loginInfo)
      .map((user:any) => {    
        let data:any = JSON.parse(user._body).data;    
        console.log(data);  
        authorizationService.setCurrentUser(data);
        appHttpProvider.headers({ Authorization: data.token });
        return user;
      });
  }
  /**
   * 退出登录
   */
  logout(): void {
    this.authorizationService.logout();
  }
}
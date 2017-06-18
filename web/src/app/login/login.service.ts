import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../core/authorization-service/authorization.service';
import { AppHttpProvider } from '../core/app-http/apphttp.service';

@Injectable()
export class LoginService {

  constructor(
              protected ajax: AppHttpProvider,
              private authorizationService: AuthorizationService) {
  }

  isLogin(): boolean{
    return this.authorizationService.isLogin();
  }
  
  /**
   * 登录
   * @param loginInfo 
   */
  login(loginInfo: {username: string; password: string }): Observable<any> {
    const authorizationService = this.authorizationService;
    console.log(loginInfo);
    return this.ajax.post('/login', loginInfo)
      .map((user: any) => {
        console.log(user);
        if(user.code === 0){
          authorizationService.setCurrentUser(user.data);
        }
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
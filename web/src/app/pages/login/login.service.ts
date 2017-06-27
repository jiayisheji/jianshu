import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../../core/authorization';
import { AppHttpProvider } from '../../core/ajax';

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
    console.log(loginInfo, authorizationService);
    return this.ajax.post('/login', loginInfo)
      .map((user: any) => {
        console.log(user);
        if(user.meta.code === 200){
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

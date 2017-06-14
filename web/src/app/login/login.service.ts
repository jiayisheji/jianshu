import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { AuthorizationService } from '../core/authorization-service/authorization.service';
import { AppHttpProvider, AppHttp, POST, Body } from '../app.service';
import { Http } from '@angular/http';

@Injectable()
export class LoginService extends AppHttp{

  constructor(protected  http: Http,
              protected appHttpProvider: AppHttpProvider,
              private authorizationService: AuthorizationService) {
    super();
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
    const appHttpProvider = this.appHttpProvider;
    console.log(loginInfo);
    return this.innerLogin(loginInfo)
      .map(user => {
        console.log(user);
        if(user.code === 0){
          authorizationService.setCurrentUser(user.data);
          appHttpProvider.headers({ Authorization: user.data.token });
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


  @POST('login')
  private innerLogin(@Body body): Observable<any> {
    return null;
  }
}
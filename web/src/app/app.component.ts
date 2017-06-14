import { Component, ViewContainerRef } from '@angular/core';
import { AppHttpProvider } from './app.service';
import { AuthorizationService } from './core/authorization-service/authorization.service'
import { LoadingService } from  './core/loading/loading.service';
import { Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appHttpProvider: AppHttpProvider, 
              private authorizationService: AuthorizationService,
              private viewContainer: ViewContainerRef,
              private router: Router,
              private  loadService: LoadingService) {
  loadService.defaultViewContainerRef = viewContainer;
  appHttpProvider
      .baseUrl('http://localhost:3000/api/v1')
      .json()
      .addInterceptor({
        request: request => {
          console.log('全局拦截器(request)', request);
        },
        response: (stream) => stream.map(response => {
          console.log('全局拦截器(response)', response);
          return response;
        })
      })
      .addInterceptor({
        request: () => {
          loadService.show();
        },
        response: (stream) => {
          (<any>stream).subscribe(() => null, () => loadService.hide(), () => loadService.hide())
        }  
      })
      .addResponseErrorInterceptor((err: Response) => {
        if (err.status === 401 && (err.url.indexOf('/login') === -1)) {
          router.navigateByUrl('/login');
          return null;
        }
        return Observable.throw(err);
      });
      const currentUser = <any>authorizationService.getCurrentUser();
      if (currentUser && currentUser.token) {
        appHttpProvider.headers({ Authorization: 'Bearer ' + currentUser.token }); 
      }
  } 


  
     
}

import { Component, ViewContainerRef } from '@angular/core';
import { AppHttpProvider } from './core/app-http/apphttp.service';
import { LoadingService } from  './core/loading/loading.service';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appHttpProvider: AppHttpProvider, private viewContainer: ViewContainerRef,
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
        response: (stream) => (<any>stream).do(() => null, () => loadService.hide(), () => loadService.hide())
      });
  }    
}

import { Component, ViewContainerRef } from '@angular/core';
import { AuthorizationService } from './core/authorization'
import { AppHttpProvider } from './core/ajax'
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  template: `<router-outlet></router-outlet>`,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private appHttpProvider: AppHttpProvider,
              private authorizationService: AuthorizationService,
              private router: Router) {
      appHttpProvider.setBaseUrl('http://localhost:3000/api/v1');

      const currentUser = <any>authorizationService.getCurrentUser();
      if (currentUser && currentUser.token) {
        appHttpProvider.setHeaders({
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + currentUser.token
        });
      } else{
        appHttpProvider.setHeaders({
          'Content-Type': 'application/json'
        });
      }
  }




}

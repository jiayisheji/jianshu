/**
 * Created by jiayi on 2017/9/21.
 */
import { Routes, RouterModule } from '@angular/router';

export const ROUTER_CONFIG: Routes = [
  { path: 'register', loadChildren: 'app/pages/register/register.module#RegisterModule' },
  { path: '',   redirectTo: '/register', pathMatch: 'full' }
  // { path: '**', component: NotFoundComponent }
];


export const ROUTING = RouterModule.forRoot(ROUTER_CONFIG);

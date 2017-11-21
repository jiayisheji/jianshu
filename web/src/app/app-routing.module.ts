import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from '@app/feature/layout';
import { HomeComponent } from '@app/feature/home';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: HomeComponent,
      },
    ]
  },
  { path: 'register', loadChildren: 'app/feature/auths/register/register.module#RegisterModule' },
  { path: '404', loadChildren: 'app/feature/exception/not-found/not-found.module#NotFoundModule' },
  { path: '500', loadChildren: 'app/feature/exception/inteal-server-error/inteal-server-error.module#IntealServerErrorModule' },
  {
    path: '**',
    redirectTo: '/404',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SharedModule } from '../../shared';

import { RegisterComponent } from './register.component';

/**
 * 定义路由
 * @type {[{path: string; component: RegisterComponent}]}
 */
export const routes: Routes = [
  {
    path: '', component: RegisterComponent
  }
];

@NgModule({
  imports: [
    SharedModule,
    RouterModule.forChild(routes)
  ],
  declarations: [RegisterComponent]
})
export class RegisterModule { }

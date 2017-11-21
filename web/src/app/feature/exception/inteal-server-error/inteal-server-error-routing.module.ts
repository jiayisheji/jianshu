import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { IntealServerErrorComponent } from './inteal-server-error.component';
const routes: Routes = [{
  path: '', component: IntealServerErrorComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class IntealServerErrorRoutingModule { }

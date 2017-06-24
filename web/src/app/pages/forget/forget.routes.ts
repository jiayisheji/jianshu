/**
 * Created by Administrator on 2017/5/11.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { ForgetComponent } from './forget.component';
import { EmailResetComponent } from './email-reset/email-reset.component';
import { MobileResetComponent } from './mobile-reset/mobile-reset.component';
export const routes: Routes = [
  {
    path: '', component: ForgetComponent,
    children: [
      { path: 'mobile_reset', component: EmailResetComponent},
      { path: 'email_reset', component: MobileResetComponent}
    ]
  }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

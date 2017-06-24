/**
 * Created by Administrator on 2017/5/11.
 */
import { Routes, RouterModule } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
import { SettingsComponent } from './settings.component';
import { BasicComponent } from './basic/basic.component';
import { ProfileComponent } from './profile/profile.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { MiscComponent } from './misc/misc.component';

export const routes: Routes = [
  {
    path: '', component: SettingsComponent,
    children: [
      { path: 'basic', component: BasicComponent},
      { path: 'profile', component: ProfileComponent},
      { path: 'blacklist', component: BlacklistComponent},
      { path: 'misc', component: MiscComponent},
      { path: '', pathMatch: 'full', redirectTo: '/settings/basic' }
    ]
  },
  { path: '', pathMatch: 'full', redirectTo: '/settings' }
];
export const ROUTER_CONFIG: ModuleWithProviders = RouterModule.forChild(routes);

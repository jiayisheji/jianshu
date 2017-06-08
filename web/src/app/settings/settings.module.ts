import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { SettingsComponent } from './settings.component';

import { ROUTER_CONFIG } from './settings.routes';
import { BasicComponent } from './basic/basic.component';
import { ProfileComponent } from './profile/profile.component';
import { BlacklistComponent } from './blacklist/blacklist.component';
import { MiscComponent } from './misc/misc.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    SettingsComponent,
    BasicComponent,
    ProfileComponent,
    BlacklistComponent,
    MiscComponent
  ]
})
export class SettingsModule { }

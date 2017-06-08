import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../shared';
import { TrendingComponent } from './trending.component';

import { ROUTER_CONFIG } from './trending.routes';
import { WeeklyComponent } from './weekly/weekly.component';
import { MonthlyComponent } from './monthly/monthly.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    TrendingComponent,
    WeeklyComponent,
    MonthlyComponent
  ]
})
export class TrendingModule { }

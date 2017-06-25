import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared';
import { HomeComponent } from './home.component';
import { ROUTER_CONFIG } from './home.routes';
import { HomeCarouselComponent } from './home-carousel/home-carousel.component';
import { RecommendCollectionComponent } from './recommend-collection/recommend-collection.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ROUTER_CONFIG
  ],
  declarations: [
    HomeComponent,
    HomeCarouselComponent,
    RecommendCollectionComponent
  ]
})
export class HomeModule { }

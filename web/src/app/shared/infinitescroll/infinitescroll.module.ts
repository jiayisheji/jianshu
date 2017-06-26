import { NgModule } from '@angular/core';
import { InfiniteScrollDirective } from './infinitescroll.directive';
import { PositionResolverService } from './position-resolver.service';
import { ScrollRegisterService } from './scroll-register.service';
import { ScrollResolverService } from './scroll-resolver.service';
@NgModule({
  imports: [
  ],
  declarations: [
    InfiniteScrollDirective
  ],
  providers: [
    PositionResolverService,
    ScrollRegisterService,
    ScrollResolverService
  ],
  exports: [
    InfiniteScrollDirective
  ]
})
export class InfinitescrollModule {

}

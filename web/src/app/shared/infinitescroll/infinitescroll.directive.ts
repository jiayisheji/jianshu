import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  NgZone
} from '@angular/core';
import { PositionResolverService } from './position-resolver.service';
import { ScrollRegisterService, IScrollRegisterConfig } from './scroll-register.service';
import { ScrollResolverService } from './scroll-resolver.service';
import { AxisResolverService } from './axis-resolver.service';
import { Subscription } from 'rxjs/Subscription';

import { InfiniteScrollEvent, IScrollStats, IPositionStats } from './interface';

@Directive({
  selector: '[infiniteScroll]'
})
export class InfiniteScrollDirective implements OnInit, OnDestroy {
  @Output() scrolled = new EventEmitter<InfiniteScrollEvent>();
  @Output() scrolledUp = new EventEmitter<InfiniteScrollEvent>();

  @Input() infiniteScrollDistance: number = 2;
  @Input() infiniteScrollUpDistance: number = 1.5;
  @Input() infiniteScrollThrottle: number = 300;
  @Input() infiniteScrollDisabled: boolean = false;
  @Input() infiniteScrollContainer: any = null;
  @Input() scrollWindow: boolean = true;
  @Input() immediateCheck: boolean = false;
  @Input() horizontal: boolean = false;
  @Input() alwaysCallback: boolean = false;

  private disposeScroller: Subscription;
  constructor(
    private element: ElementRef,
    private zone: NgZone,
    private positionResolver: PositionResolverService,
    private scrollRegister: ScrollRegisterService,
    private scrollerResolver: ScrollResolverService
  ) {}

  ngOnInit() {
    if (typeof window !== 'undefined') {
      this.zone.runOutsideAngular(() => {
        const containerElement = this.resolveContainerElement();
        const resolver = this.positionResolver.create({
          axis: new AxisResolverService(!this.horizontal),
          windowElement: containerElement,
        });
        const options: IScrollRegisterConfig = {
          container: resolver.container,
          filterBefore: () => !this.infiniteScrollDisabled,
          mergeMap: () => this.positionResolver.calculatePoints(this.element, resolver),
          scrollHandler: (container: IPositionStats) => this.handleOnScroll(container),
          throttleDuration: this.infiniteScrollThrottle
        };
        this.disposeScroller = this.scrollRegister.attachEvent(options);
      });
    }

  }

  handleOnScroll(container: IPositionStats) {
    const distance = {
      down: this.infiniteScrollDistance,
      up: this.infiniteScrollUpDistance
    };
    const scrollStats: IScrollStats = this.scrollerResolver.getScrollStats(container, { distance });
    if (this.shouldTriggerEvents(scrollStats.shouldScroll)) {
      const infiniteScrollEvent: InfiniteScrollEvent = {
        currentScrollPosition: container.scrolledUntilNow
      };
      if (scrollStats.isScrollingDown) {
        this.onScrollDown(infiniteScrollEvent);
      } else {
        this.onScrollUp(infiniteScrollEvent);
      }
    }
  }


  shouldTriggerEvents(shouldScroll: boolean) {
    return (this.alwaysCallback || shouldScroll) && !this.infiniteScrollDisabled;
  }

  ngOnDestroy () {
    if (this.disposeScroller) {
      this.disposeScroller.unsubscribe();
    }
  }
  onScrollUp(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolledUp.emit(data));
  }
  onScrollDown(data: InfiniteScrollEvent = { currentScrollPosition: 0 }) {
    this.zone.run(() => this.scrolled.emit(data));
  }
  private resolveContainerElement(): any {
    const selector = this.infiniteScrollContainer;
    const hasWindow = window && window.hasOwnProperty('document');
    const containerIsString = selector && hasWindow && typeof(this.infiniteScrollContainer) === 'string';
    let container = containerIsString
      ? window.document.querySelector(selector)
      : selector;
    if (!selector) {
      container = this.scrollWindow ? window : this.element;
    }
    return container;
  }
}

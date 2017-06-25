import {
  Directive,
  ElementRef,
  Input,
  Output,
  EventEmitter,
  OnDestroy,
  OnInit,
  SimpleChanges,
  NgZone
} from '@angular/core';

console.log('nativeElement', window, document.documentElement.clientHeight);

@Directive({
  selector: '[infinite-scroll]'
})
export class InfiniteScrollDirective implements OnInit {
  @Input('scrollDistance') scrollTrigger: number;
  @Input() scrollWindow: boolean;
  @Output() OnScrollMethod = new EventEmitter<any>();

  constructor(
    private element: ElementRef,
    private zone: NgZone
  ) {}

  ngOnInit() {
    console.log('nativeElement', this.element, this.zone);
  }

  public pageYOffset(element) {
    const el = element[0] || element;

    if (isNaN(window.pageYOffset)) {
      return el.document.documentElement.scrollTop;
    }
    return el.ownerDocument.defaultView.pageYOffset;
  }

  public offsetTop(element) {
    if (!(!element[0].getBoundingClientRect || element.css('none'))) {
      return element[0].getBoundingClientRect().top + this.pageYOffset(element);
    }
    return undefined;
  }

  onScroll() {
    /*this._count++;
    if(this._element.scrollTop + this._element.clientHeight >= this._element.scrollHeight) {
      this.OnScrollMethod.emit(null);
    }else {
      if(this._count % this.scrollTrigger === 0) {
        this.OnScrollMethod.emit(null);
      }
    }*/
  }

}

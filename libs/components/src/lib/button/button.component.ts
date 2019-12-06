import { FocusMonitor, FocusOrigin } from '@angular/cdk/a11y';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  Input,
  OnDestroy,
  OnInit,
  ViewEncapsulation,
} from '@angular/core';
import { BooleanHook, ColorHook, Size, SizeHook, ThemePalette } from '../core';

const BUTTON_HOST_ATTRIBUTES = [
  'sim-button',
  'sim-invert-button',
  'sim-outlined-button',
  'sim-flat-button',
  'sim-icon-button',
  'sim-raised-button',
  'sim-stroked-button',
  'sim-broken-button',
  'sim-fab-button',
  'sim-fluid-button',
  'sim-pill-button',
  'sim-link-button',
];

@Component({
  // tslint:disable-next-line: component-selector
  selector: `button[sim-button], button[sim-invert-button], button[sim-flat-button], button[sim-icon-button],
             button[sim-stroked-button], button[sim-broken-button],
             button[sim-fab-button], button[sim-fluid-button], button[sim-pill-button]`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimButtonComponent implements OnInit, OnDestroy {
  @Input()
  @BooleanHook<SimButtonComponent>()
  @HostBinding('class.sim-button-loading')
  public loading = false;

  @Input()
  @ColorHook<SimButtonComponent>()
  public color: ThemePalette;

  @Input()
  @SizeHook<SimButtonComponent>()
  public size: Size = 'md';

  @Input()
  @BooleanHook<SimButtonComponent>()
  @HostBinding('class.sim-button-disabled')
  public disabled: boolean;

  constructor(protected elementRef: ElementRef, protected _focusMonitor: FocusMonitor) { }

  public ngOnInit(): void {
    // 存储已存在的 用户添加的 或者@Input输入的
    const oldClassList = this._getHostElement().className.trim();
    this._getHostElement().className = '';
    // 保证私有的优先添加
    let newClassList = '';
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr) && !oldClassList.includes(attr)) {
        newClassList += newClassList + ' ' + attr;
      }
    }
    let mergeClass = (newClassList + ' ' + oldClassList).trim();
    // 强制处理一下sim-link-button
    if (mergeClass.includes('sim-link-button')) {
      mergeClass = mergeClass.replace(/ui\-[a-z]+\-button/g, '').trim();
      mergeClass = 'sim-link-button sim-anchor-button ' + mergeClass;
    }
    // 合并私有的，存储已存在的
    this._getHostElement().className = 'sim-button-base ' + mergeClass;
    this._focusMonitor.monitor(this.elementRef, true);
  }

  public ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this.elementRef);
  }

  public focus(origin: FocusOrigin = 'program', options?: FocusOptions): void {
    this._focusMonitor.focusVia(this._getHostElement(), origin, options);
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }
}

@Component({
  // tslint:disable-next-line: component-selector
  selector: `a[sim-button], a[sim-invert-button], a[sim-flat-button], a[sim-icon-button],
             a[sim-stroked-button], a[sim-broken-button],
             a[sim-fab-button], a[sim-fluid-button], a[sim-pill-button], a[sim-link-button]`,
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimAnchorComponent extends SimButtonComponent implements OnInit {
  @HostBinding('class.sim-anchor-button') public hostClass = true;

  /** 按钮的tabindex */
  @Input() public tabIndex: number;

  constructor(elementRef: ElementRef, _focusMonitor: FocusMonitor) {
    super(elementRef, _focusMonitor);
  }

  @HostListener('click', ['$event'])
  public _haltDisabledEvents(event: Event) {
    // 禁用按钮不应应用任何操作
    if (this.disabled) {
      event.preventDefault();
      event.stopImmediatePropagation();
    }
  }
}

import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, Input, HostBinding, ElementRef, HostListener } from '@angular/core';
import { FocusMonitor, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';

import { toBoolean } from '@jianshu/utils';

import { ColorHook, ThemePalette, SizeHook, Size, BooleanHook } from '../core';

const BUTTON_HOST_ATTRIBUTES = [
  'ui-flat-button',
  'ui-icon-button',
  'ui-raised-button',
  'ui-stroked-button',
  'ui-broken-button',
  'ui-fab-button',
  'ui-fluid-button',
  'ui-pill-button',
  'ui-link-button',
];

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[ui-button],button[ui-flat-button],button[ui-icon-button],button[ui-raised-button],button[ui-stroked-button],button[ui-broken-button],button[ui-fab-button],button[ui-fluid-button],button[ui-pill-button]',
  exportAs: 'uiButton',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent implements OnInit, OnDestroy {

  @Input()
  @HostBinding('class.ui-button-loading')
  get loading(): boolean {
    return this._loading;
  }
  set loading(value: boolean) {
    this._loading = toBoolean(value);
  }

  @Input()
  @ColorHook<ButtonComponent>()
  color: ThemePalette;

  @Input()
  @SizeHook<ButtonComponent>()
  size: Size;

  @Input()
  @BooleanHook<ButtonComponent>()
  disabled: boolean;

  private _loading: boolean;

  constructor(
    protected elementRef: ElementRef,
    protected _focusMonitor: FocusMonitor,
  ) { }

  ngOnInit() {
    // 给尺寸设置默认值
    if (!this.size) {
      this.size = 'md';
    }
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
    // 强制处理一下ui-link-button
    if (mergeClass.includes('ui-link-button')) {
      mergeClass = mergeClass.replace(/ui\-[a-z]+\-button/g, '').trim();
      mergeClass = 'ui-link-button ui-anchor-button ' + mergeClass;
    }
    // 合并私有的，存储已存在的
    this._getHostElement().className = 'ui-button ' + mergeClass;
    this._focusMonitor.monitor(this.elementRef, true);
  }

  ngOnDestroy(): void {
    this._focusMonitor.stopMonitoring(this.elementRef);
  }

  focus(origin: FocusOrigin = 'program', options?: FocusOptions): void {
    this._focusMonitor.focusVia(this._getHostElement(), origin, options);
  }

  private _hasHostAttributes(...attributes: string[]) {
    return attributes.some(attribute => this._getHostElement().hasAttribute(attribute));
  }

  private _getHostElement() {
    return this.elementRef.nativeElement;
  }

}

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'a[ui-button],a[ui-flat-button],a[ui-icon-button],a[ui-raised-button],a[ui-stroked-button],a[ui-broken-button],a[ui-fab-button],a[ui-fluid-button],a[ui-pill-button],a[ui-link-button]',
  exportAs: 'uiButton, uiAnchor',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AnchorComponent extends ButtonComponent implements OnInit, OnDestroy {
  @HostBinding('class.ui-anchor-button') public hostClass = true;

  /** 按钮的tabindex */
  @Input() tabIndex: number;

  constructor(
    elementRef: ElementRef,
    _focusMonitor: FocusMonitor,
  ) {
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

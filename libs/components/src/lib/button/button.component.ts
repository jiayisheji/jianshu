import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy, OnDestroy, Input, HostBinding, ElementRef } from '@angular/core';
import { FocusMonitor, FocusableOption, FocusOrigin } from '@angular/cdk/a11y';

import { toBoolean } from '@jianshu/utils';

type ThemePalette = 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warning' | 'link' | undefined;

type Size = 'small' | 'medium' | 'success' | 'danger' | 'warn' | undefined;

const BUTTON_HOST_ATTRIBUTES = [
  'ui-flat-button',
  'ui-icon-button',
  'ui-raised-button',
  'ui-stroked-button',
  'ui-fab-button',
  'ui-fluid-button',
  'ui-pill-button',
];

@Component({
  // tslint:disable-next-line: component-selector
  selector: 'button[ui-button],button[ui-flat-button],button[ui-icon-button],button[ui-raised-button],button[ui-stroked-button],button[ui-fab-button],button[ui-fluid-button],button[ui-pill-button]',
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

  @Input() color: ThemePalette;

  @Input() size: Size;

  @Input() disabled: boolean;

  private _loading: boolean;

  constructor(
    private elementRef: ElementRef,
    private _focusMonitor: FocusMonitor,
  ) { }

  ngOnInit() {
    this._getHostElement().classList.add('ui-button');
    console.log(this._getHostElement());
    for (const attr of BUTTON_HOST_ATTRIBUTES) {
      if (this._hasHostAttributes(attr)) {
        this._getHostElement().classList.add(attr);
      }
    }
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

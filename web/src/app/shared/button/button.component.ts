import {
  Component,
  OnInit,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  HostBinding,
  Input,
  Directive,
  ElementRef,
  Renderer2
} from '@angular/core';
/**
 *  按钮颜色
 *   default 默认的
 *   primary 主要的
 *   secondary 次要的
 *   success 成功的
 *   danger 危险的
 *   warning 危险的
 *   link 链接
 *   info 信息
 */
export type IButtonColor = 'default' | 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'link' | 'info';

/**
 *  按钮尺寸
 *    default 默认的
 *    lg  大的
 *    md  中等
 *    sm  小的
 *    xs  超小的
 */
export type IButtonSize = 'default' | 'lg' | 'md' | 'sm' | 'xs';

/**
 *  按钮形状
 *    default 默认的
 *    outline 实线轮廓的
 *    dashed  虚线轮廓的
 */
export type IButtonShape = 'default' | 'outline' | 'dashed';
@Component({
  // tslint:disable-next-line:component-selector
  selector: '[jui-button]',
  template: '<ng-content></ng-content>',
  styleUrls: ['./button.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ButtonComponent {
  _el: HTMLElement;
  _classList: Array<string> = [];

  _prefixCls = 'jui-btn';

  _color: IButtonColor = 'default';
  @Input()
  get color(): IButtonColor {
    return this._color;
  }
  set color(value: IButtonColor) {
    this._color = value;
    this._setClassMap();
  }

  _size: IButtonSize = 'default';
  @Input()
  get size(): IButtonSize {
    return this._size;
  }
  set size(value: IButtonSize) {
    this._size = value;
    this._setClassMap();
  }

  _shape: IButtonShape = 'default';
  @Input()
  get shape(): IButtonShape {
    return this._shape;
  }
  set shape(value: IButtonShape) {
    this._shape = value;
    this._setClassMap();
  }

  constructor(private _elementRef: ElementRef, private _renderer: Renderer2) {
    this._el = this._elementRef.nativeElement;
    this._renderer.addClass(this._el, this._prefixCls);
    this._renderer.addClass(this._el, `${this._prefixCls}-default`);
  }

  private _setClassMap() {
    if (this.color && this.color !== 'default') {
      this._renderer.removeClass(this._el, `${this._prefixCls}-default`);
    }
    this._classList = [
      this.color && `${this._prefixCls}-${this.color}`,
      this.size && this.size !== 'default' && `${this._prefixCls}-${this.size}`,
      this.shape && this.shape !== 'default' && `${this._prefixCls}-${this.shape}`,
    ].filter(item => !!item);
    this._classList.forEach(item => {
      this._renderer.addClass(this._el, item);
    });
  }
}

@Directive({
  selector: '[juiButtonBlock],[jui-button-block]'
})
export class ButtonBlockDirective {
  @HostBinding('class.jui-btn-block') _juiButton = true;
}

@Directive({
  selector: '[juiButtonPill],[jui-button-pill]'
})
export class ButtonPillDirective {
  @HostBinding('class.jui-btn-pill') _juiButton = true;
}

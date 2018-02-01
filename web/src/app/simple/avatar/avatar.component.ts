import { Component, OnInit, Input, ElementRef, Renderer2, ChangeDetectionStrategy } from '@angular/core';

export type avatarShapesTppe = 'circle' | 'square';
export type avatarSizeTppe = 'default' | 'large' | 'small';

@Component({
  // tslint:disable-next-line:component-selector
  selector: '[jui-avatar]',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AvatarComponent implements OnInit {
  // 图片地址
  @Input() avatarSrc: string;
  // 显示形状 圆形 | 正方形 默认圆形
  @Input() avatarShapes: avatarShapesTppe = 'circle';
  // 显示尺寸大小  48 | 32 | 80 默认48
  @Input() avatarSize: avatarSizeTppe | string = 'default';
  _src: string;
  _size = 48;
  _element: ElementRef;
  constructor(private _el: ElementRef, private _renderer: Renderer2) {
    this._element = this._el.nativeElement;
  }

  ngOnInit() {
    // 设置显示形状 圆 or 正方形
    this._renderer.addClass(this._element, this.avatarShapes);
    // 如果可用解析成数字就直接设置宽高 如果不能就走字符串判断
    if (!isNaN(+this.avatarSize)) {
      // 自定义宽度要大于等于16 => 不然图片太小也看不见
      if (+this.avatarSize >= 16) {
        this._size = +this.avatarSize;
      }
      this.setStyle(this._size);
    } else {
      // 如果不是large|small都走默认
      if (this.avatarSize === 'large') {
        this.setClass('large', 80);
      } else if (this.avatarSize === 'small') {
        this.setClass('small', 32);
      }
    }
    this._src = this.avatarSrc;
  }

  /**
   * 设置样式
   * @param value 宽高值
   */
  private setStyle(value: number = 48): void {
    this._renderer.setStyle(this._element, 'width', value + 'px');
    this._renderer.setStyle(this._element, 'height', value + 'px');
  }

  /**
   * 设置class
   * @param name class类名
   * @param size alt显示值
   */
  private setClass(name: string, size: number): void {
    this._size = size;
    this._renderer.addClass(this._element, name);
  }
}

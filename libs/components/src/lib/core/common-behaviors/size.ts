import { ValueHook } from './value-hook';

/**
 * 尺寸模式
 * - xs Extra small 极小的
 * - sm small 小的
 * - md medium 中等的/默认的
 * - lg large 大的
 * - xl extra large 失败的/错误的
 */
export type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | undefined;

export function SizeHook<T, K = Size>(
  setter?: (key?: symbol, value?: K) => boolean | void,
  getter?: (value?: K) => K,
) {
  return ValueHook<T, K>(function (key: symbol, value: K) {
    const sizePalette = value || 'md';
    if (sizePalette !== this[key]) {
      const elementRef = this.elementRef;
      if (!elementRef) {
        throw Error('has "private elementRef: ElementRef"');
      }
      const classList = elementRef.nativeElement.classList;
      if (this[key]) {
        classList.remove(`ui-${this[key]}`);
      }
      if (sizePalette) {
        classList.add(`ui-${sizePalette}`);
      }
      this[key] = sizePalette;
    }
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter)
}

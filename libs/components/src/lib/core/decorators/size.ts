import { ValueHook } from './value-hook';

/**
 * 尺寸模式
 * - sm small 小的
 * - md medium 中等的/默认的
 * - lg large 大的
 */
export type Size = 'sm' | 'md' | 'lg' | undefined;

export function SizeHook<T, K = Size>(setter?: (key?: symbol, value?: K) => boolean | void, getter?: (value?: K) => K) {
  return ValueHook<T, K>(function(key: symbol, value: K) {
    const sizePalette = value || 'md';
    if (sizePalette !== this[key]) {
      const elementRef = this.elementRef;
      if (!elementRef) {
        throw Error('has "private elementRef: ElementRef"');
      }
      const classList = elementRef.nativeElement.classList;
      if (this[key]) {
        classList.remove(`sim-${this[key]}`);
      }
      if (sizePalette) {
        classList.add(`sim-${sizePalette}`);
      }
      this[key] = sizePalette;
    }
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter);
}

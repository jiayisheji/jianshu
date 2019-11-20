import { ValueHook } from './value-hook';

/**
 * 主题调色板
 * - primary 主要的
 * - secondary 次要的
 * - info 信息的
 * - success 成功的
 * - danger 失败的/错误的
 * - warning 警告的
 * - link 链接的
 */
export type ThemePalette = 'primary' | 'secondary' | 'info' | 'success' | 'danger' | 'warning' | 'link' | undefined;

export function ColorHook<T, K = ThemePalette>(
  setter?: (key?: symbol, value?: K) => boolean | void,
  getter?: (value?: K) => K,
) {
  return ValueHook<T, K>(function (key: symbol, value: K) {
    const colorPalette = value || '';
    if (colorPalette !== this[key]) {
      const elementRef = this.elementRef;
      if (!elementRef) {
        throw Error('has "private elementRef: ElementRef"');
      }
      const classList = elementRef.nativeElement.classList;
      if (this[key]) {
        classList.remove(`ui-${this[key]}`);
      }
      if (colorPalette) {
        classList.add(`ui-${colorPalette}`);
      }
      this[key] = colorPalette;
    }
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter)
}

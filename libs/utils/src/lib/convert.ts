import { isString } from './typeof';

/**
 * @description 将提供的值包装在数组中，除非提供的值是数组
 * @export
 * @param value 任意值
 * @returns 返回数组
 */
export function toArray<T>(value: T | T[]): T[] {
  return Array.isArray(value) ? value : [value];
}

/**
 * @description 将数据绑定值(通常是字符串)强制转换为布尔值
 * @export
 * @param value 任意值
 * @returns 返回布尔值
 */
// tslint:disable-next-line: no-any
export function toBoolean(value: any): boolean {
  return value != null && `${value}` !== 'false';
}

/**
 * @description 将数据绑定值(通常是字符串)强制转换为数字
 * @export
 * @param value 任意值
 * @returns 返回数字
 */
// tslint:disable-next-line: no-any
export function toNumber(value: any): number;
// tslint:disable-next-line: no-any
export function toNumber<D>(value: any, fallback: D): number | D;
// tslint:disable-next-line: no-any
export function toNumber(value: any, fallbackValue = 0) {
  return _isNumberValue(value) ? Number(value) : fallbackValue;
}

/**
 * Whether the provided value is considered a number.
 * @docs-private
 */
/**
 * @description 检查所提供的值是否被认为是一个数字
 * @private
 * @param value 任意值
 * @returns 如果是数字字符串返回true，否则返回false
 */
// tslint:disable-next-line: no-any
export function _isNumberValue(value: any): boolean {
  // parseFloat(value)处理我们感兴趣的大多数情况(它将null、空字符串和其他非数字值视为NaN，其中Number只使用0)，
  // 但是它认为字符串“123hello”是一个有效的数字。因此我们还要检查Number(value)是否为NaN。
  return !isNaN(parseFloat(value)) && !isNaN(Number(value));
}

/**
 * @description 将数据绑定值(通常是字符串)强制转换为指定值
 * @export
 * @param value 任意值
 * @returns 返回指定值
 */
// tslint:disable-next-line: no-any
export function toJson<D>(value: any): D;
// tslint:disable-next-line: no-any
export function toJson<D, T>(value: any, fallback: D): T | D;
// tslint:disable-next-line: no-any
export function toJson(value: any, fallbackValue = null) {
  if (!isString(value)) {
    return value;
  }
  try {
    return JSON.parse(value);
  } catch (unusedVariable) {
    return fallbackValue;
  }
}

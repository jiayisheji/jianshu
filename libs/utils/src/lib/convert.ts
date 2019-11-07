import { isNil, isArray, isNumberValue, isString } from './typeof';

/** 强制转换成数组 */
export function toArray<T>(value: T): T[];
// tslint:disable-next-line: unified-signatures
export function toArray<T>(value: T[]): T[];
export function toArray<T>(value: T | T[]): T[] {
  if (isNil(value)) {
    return [];
  }
  return isArray<T>(value) ? value : [value];
}

/** 强制转换成布尔值 */
// tslint:disable-next-line:no-any
export function toBoolean(value: any): boolean {
  return !isNil(value) && `${value}` !== 'false';
}

/** 强制转换成数字 */
// tslint:disable-next-line:no-any
export function toNumber(value: any): number;
// tslint:disable-next-line:no-any
export function toNumber<D>(value: any, fallback: D): number | D;
// tslint:disable-next-line:no-any
export function toNumber(value: any, fallbackValue = 0) {
  return isNumberValue(value) ? Number(value) : fallbackValue;
}

/** 强制转换成JSON */
export function toJson(value: string): Record<string, any>;
export function toJson<T = null>(value: string, fallbackValue?: T): null | T;
export function toJson(value: string, fallbackValue = null) {
  // 如果指定值 不是字符串，则返回fallbackValue。减少JSON.parse解析错误问题。
  if (!isString(value)) {
    return fallbackValue;
  }
  try {
    return JSON.parse(value);
  } catch (unusedVariable) {
    return fallbackValue;
  }
}

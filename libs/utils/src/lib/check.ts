import { toArray } from './convert';
import { getTypeTag, mapTag, setTag } from './type';
import { isArray, isArrayLike, isPlainObject, isString } from './typeof';
import { AnyType } from './types';

/**
 * @description 判断两个值是否相等
 * @export
 * @param value 任意值
 * @param other 任意值
 * @returns 两个值相等为true，否则为false
 */
export function isEqual(value: AnyType, other: AnyType): boolean {
  // 基本类型值
  if (value === other) {
    return true;
  }
  // 如果有一个是假值
  if (value === null || value === undefined || other === null || other === undefined) {
    return false;
  }
  // 判断对象
  if (!value || !other || (typeof value !== 'object' && typeof other !== 'object')) {
    return value === other;
  }
  // 原型不相等
  if (value.prototype !== other.prototype) {
    return false;
  }
  // 时间对象
  if (value instanceof Date && other instanceof Date) {
    return value.getTime() === other.getTime();
  }
  // 如果是Map
  if (getTypeTag(value) === mapTag && getTypeTag(other) === mapTag) {
    const size = value.size;
    if (size !== other.size) {
      return false;
    }
    let i = 0;

    value.forEach((val: AnyType, key: AnyType) => {
      if (isEqual(val, other.get(key))) {
        i++;
      }
    });
    return i === size;
  }

  // 如果是Set
  if (getTypeTag(value) === setTag && getTypeTag(other) === setTag) {
    const size = value.size;
    if (size !== other.size) {
      return false;
    }
    let i = 0;

    value.forEach((val: AnyType) => {
      if (other.has(val)) {
        i++;
      }
    });
    return i === size;
  }

  // 如果是数组
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    return value.every((item, i) => isEqual(item, other[i]));
  }

  // 如果是对象
  const keys = Object.keys(value);
  if (keys.length !== Object.keys(other).length) {
    return false;
  }
  return keys.every(k => isEqual(value[k], other[k]));
}
/** Used to check objects for own properties. */
const hasOwnProperty = Object.prototype.hasOwnProperty;
/**
 * @description 检查提供的值是否为空或其长度是否等于0。
 * @export
 * @param value 任意值
 * @returns 如果值是空对象，则返回true; 如果值是0，则返回true; 如果集合没有可枚举属性，或任何类型不被视为集合，则返回true。
 */
export function isEmpty(value: AnyType): boolean {
  if (value == null) {
    return true;
  }

  // 判断是否数组或者类数组
  if (isArray(value) || isArrayLike(value)) {
    return !value.length;
  }

  // 判断set和map
  const tag = getTypeTag(value);
  if (tag === mapTag || tag === setTag) {
    return !value.size;
  }

  // 判断是否对象
  if (isPlainObject(value)) {
    return !Object.keys(value).length;
  }

  // 处理其他对象
  for (const key in value) {
    if (hasOwnProperty.call(value, key)) {
      return false;
    }
  }
  // true 和 非0数字都会返回true
  return true;
}

/**
 * @description 判断对象属性存在。
 * @export
 * @param val 任意对象
 * @param prop 属性值
 * @returns 如果集合没有可枚举属性，或任何类型不被视为集合，则返回true。
 */
export function has<T extends object>(val: T, prop: string | number | symbol): boolean {
  return isPlainObject(val) && hasOwnProperty.call(val, prop);
}

/**
 * @description 根据key深度获取对象对应值
 * @export
 * @param obj 对象
 * @param key 属性值或者属性集合
 * @param fallback 回退值
 * @returns 返回实际值，如果取不到返回null
 */
export function get<T extends object>(obj: T, key: string | Array<string | number>): T;
export function get<T extends object, D>(obj: T, key: string | Array<string | number>, fallback?: T): D | T;
export function get<T extends object>(obj: T, key: string | Array<string | number>, fallback: T = null): null | T {
  if (isString(key)) {
    return obj[key] || fallback;
  } else if (isArray(key)) {
    return key.reduce((xs, x) => (xs && xs[x] ? xs[x] : fallback), obj);
  }
  return fallback;
}

//
export type Omit<T, K extends keyof AnyType> = Pick<T, Exclude<keyof T, K>>;

/**
 * @description 根据属性集合排除对象值
 * @export
 * @param obj 对象
 * @param arr 属性值或者属性集合
 * @returns 返回排除属性值以外的对象属性和值
 */
export function omit<T extends object, K extends keyof T>(obj: T, arr: K | K[]): Omit<T, K> {
  const newArr = toArray(arr);
  return Object.keys(obj)
    .filter(k => !newArr.includes(k as K))
    .reduce((acc, key) => ((acc[key as Exclude<keyof T, K>] = obj[key as Exclude<keyof T, K>]), acc), {} as Omit<T, K>);
}

/**
 * @description 根据属性集合获取对象值
 * @export
 * @param obj 对象
 * @param arr 属性值或者属性集合
 * @returns 返回给定属性值以内的对象属性和值
 */
export function pick<T extends object, K extends keyof T>(obj: T, arr: K | K[]): Pick<T, K> {
  return toArray(arr).reduce((acc, curr: K) => (curr in obj && (acc[curr] = obj[curr]), acc), {} as Pick<T, K>);
}

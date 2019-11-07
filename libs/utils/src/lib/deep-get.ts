import { isString, isArray } from './typeof';
/**
 * @description 根据key深度获取对象对应值
 * @export
 * @template T
 * @param {object} obj
 * @param {(string | [string | number])} key
 * @param {T} fallback
 * @returns {(null | T)}
 */
export function deepGet<T>(obj: object, key: string | Array<string | number>, fallback?: T): null | T;
export function deepGet<T>(obj: object, key: string | Array<string | number>, fallback: T = null): null | T {
  if (isString(key)) {
    return obj[key] || fallback;
  } else if (isArray(key)) {
    return key.reduce((xs, x) => (xs && xs[x] ? xs[x] : fallback), obj)
  }
  return fallback;
}

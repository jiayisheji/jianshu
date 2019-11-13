import { isArray, isPrimitive } from './typeof';

/**
 * @description 深度克隆
 * @export
 * @param {object} obj
 * @returns {object}
 */
// tslint:disable-next-line: no-any
export function deepClone<T, D>(target: T): T & D;
export function deepClone<T extends object>(obj: object): T {
  // 原始类型直接返回
  if (isPrimitive(obj)) {
    return obj;
  }
  // 浅拷贝
  const clone = Object.assign({}, obj) as T;
  // 处理深拷贝
  Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
  // 处理原型
  Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
  // 处理数组和其他对象
  if (isArray(obj) && obj.length) {
    // tslint:disable-next-line: no-any
    (clone as any).length = obj.length;
    // tslint:disable-next-line: no-any
    return Array.from(clone as any) as any;
  } else {
    if (isArray(obj)) {
      // tslint:disable-next-line: no-any
      return Array.from(obj as any) as any;
    } else {
      return clone;
    }
  }
}

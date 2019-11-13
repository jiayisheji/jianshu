import { isNil, isPrimitive, isPromise } from './typeof';
import { deepClone } from './deep-clone';

/**
 * 对象自身属性中是否具有指定的属性
 * 方法返回一个布尔值
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * 指定的属性是否可枚举
 * 方法返回一个布尔值
 */
const propIsEnumerable = Object.prototype.propertyIsEnumerable;

/**
 * 将源对象属性过户给目标对象
 * @param to 目标对象
 * @param from 源对象
 * @param key 指定属性名
 */
function assignKey(to: any, from: any, key: string | symbol) {
  const val = from[key];
  // 如果目标对象指定属性值为undefined或val直接跳过
  if (isNil(val)) {
    return;
  }
  // 对象自身属性中是否具有指定的属性
  if (hasOwnProperty.call(to, key)) {
    if (isNil(to[key])) {
      throw new TypeError('Cannot convert undefined or null to object (' + (key as string) + ')');
    }
  }
  // 如果不为空且可枚举，则直接浅拷贝赋值
  if (!hasOwnProperty.call(to, key) || isPrimitive(val)) {
    to[key] = val;
  } else {
    to[key] = assign(deepClone(to[key]), val);
  }
}

/**
 * 将源对象过户给目标对象
 * @param to 目标对象
 * @param from 源对象
 */
function assign(to: any, from: any) {
  if (to === from) {
    return to;
  }

  from = deepClone(from);

  for (const key in from) {
    if (hasOwnProperty.call(from, key)) {
      assignKey(to, from, key);
    }
  }

  if (Object.getOwnPropertySymbols) {
    const symbols = Object.getOwnPropertySymbols(from);

    for (const symbol of symbols) {
      if (propIsEnumerable.call(from, symbol)) {
        assignKey(to, from, symbol);
      }
    }
  }
  return to;
}
/**
 * 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source 要从中复制属性的源对象
 */
export function deepAssign<T, U>(target: T, source: U): T & U;
/**
 * 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source1 复制属性的第一个源对象
 * @param source2 复制属性的第二个源对象
 */
export function deepAssign<T, U, V>(target: T, source1: U, source2: V): T & U & V;
/**
 * 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source1 复制属性的第一个源对象
 * @param source2 复制属性的第二个源对象
 * @param source3 复制属性的第三个源对象
 */
export function deepAssign<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
/**
 * 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param sources 复制属性的一个或多个源对象
 */
export function deepAssign<T extends object>(target: object): T {
  // 第一个参数为空，则抛错
  if (isNil(target)) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  // 转成对象
  const to = deepClone<object, T>(target);
  // 遍历剩余所有参数
  for (let index = 1; index < arguments.length; index++) {
    const source = arguments[index];
    // 参数为原始类型跳过，继续下一个
    if (isPromise(source)) {
      continue;
    }
    // 调用本地方法合并
    assign(to, source);
  }
  return to;
}

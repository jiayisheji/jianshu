import { isNil, isObject, isArray, isObjectLike, isArrayLike, isPlainObject, isFunction } from './typeof';
import { isEqual } from './check';
import { clone, initCloneObject, copyArray } from './clone';

/**
 * @description 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source 要从中复制属性的源对象
 */
export function merge<T, U>(target: T, source: U): T & U;
/**
 * @description 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source1 复制属性的第一个源对象
 * @param source2 复制属性的第二个源对象
 */
export function merge<T, U, V>(target: T, source1: U, source2: V): T & U & V;
/**
 * @description 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param source1 复制属性的第一个源对象
 * @param source2 复制属性的第二个源对象
 * @param source3 复制属性的第三个源对象
 */
export function merge<T, U, V, W>(target: T, source1: U, source2: V, source3: W): T & U & V & W;
/**
 * @description 深度将所有可枚举自身属性的值从一个或多个源对象复制到目标对象。返回目标对象。
 * @param target 要复制到的目标对象
 * @param sources 复制属性的一个或多个源对象
 */
// tslint:disable-next-line: no-any
export function merge<T extends object>(target: T, ...sources: any[]): T {
  // 第一个参数为空，则抛错
  if (isNil(target)) {
    throw new TypeError('Cannot convert undefined or null to object');
  }
  let index = -1;
  const length = sources.length;
  // 转成对象
  target = Object(target)
  while (++index < length) {
    const source = sources[index]
    if (source) {
      assigner(target, source, index);
    }
  }
  return target;
}

// tslint:disable-next-line: no-any
function assigner(object: any, source: any, index: number, stack?: WeakMap<any, any>) {
  if (object === source) {
    return;
  }
  // tslint:disable-next-line: no-any
  baseFor(source, (srcValue: any, key: string) => {
    if (isObject(srcValue)) {
      assignerDeep(object, source, key, index, assigner, stack || new WeakMap())
    } else {
      assignMergeValue(object, key, srcValue);
    }
  })
}

// tslint:disable-next-line: no-any
function assignerDeep(object: any, source: any, key: string, index: number, assign: (object: any, source: any, index: number, stack?: WeakMap<any, any>) => void, stack: WeakMap<any, any>) {
  const objValue = object[key];
  const srcValue = source[key];
  const stacked = stack.get(srcValue);
  if (stacked) {
    assignMergeValue(object, key, stacked);
    return;
  }
  // tslint:disable-next-line: no-any
  let newValue: any;
  let isCommon = true;
  if (isCommon) {
    newValue = srcValue;
    if (isArray(srcValue)) {
      if (isArray(objValue)) {
        newValue = objValue;
      } else if (isObjectLike(objValue) && isArrayLike(objValue)) {
        newValue = copyArray(objValue);
      } else {
        newValue = [];
      }
    } else if (isPlainObject(srcValue)) {
      newValue = objValue;
      if (isFunction(objValue) || !isObject(objValue)) {
        newValue = initCloneObject(srcValue);
      }
    } else {
      isCommon = false;
    }
  }

  if (isCommon) {
    // 递归地合并对象和数组(容易受到调用堆栈限制)
    stack.set(srcValue, newValue);
    assign(newValue, srcValue, index, stack);
    stack.delete(srcValue);
  }
  assignMergeValue(object, key, newValue);
}


// tslint:disable-next-line: no-any
function assignMergeValue(object: any, key: string, value: any) {
  if ((value !== undefined && !isEqual(object[key], value)) ||
    (value === undefined && !(key in object))) {
    if (key === '__proto__') {
      Object.defineProperty(object, key, {
        'configurable': true,
        'enumerable': true,
        'value': value,
        'writable': true
      })
    } else {
      object[key] = value;
    }
  }
}

// tslint:disable-next-line: no-any
function baseFor(object: any, iteratee: (value: any, key: string, iterable: any) => void) {
  const iterable = Object(object)
  const props = Object.keys(object);
  let length = props.length;
  let index = -1;
  while (length--) {
    const key = props[++index];
    iteratee(iterable[key], key, iterable);
  }
  return object;
}

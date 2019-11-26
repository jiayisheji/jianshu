import { getTypeTag, objectTag } from './type';
import { AnyType } from './types';

/**
 * @description 检查给定参数是否为 undefined。
 * 使用typeof检查值是否为 undefined 类型。
 * @export
 * @param val 任意值
 * @returns 如果指定值是undefined类型，则返回true，否则返回false。
 */
export function isUndefined(val: AnyType): val is undefined {
  return typeof val === 'undefined';
}

/**
 * @description 检查给定参数是否为 symbol。
 * 使用typeof检查值是否为 symbol 类型。
 * @export
 * @param val 任意值
 * @returns 如果指定值是symbol类型，则返回true，否则返回false。
 */
export function isSymbol(val: AnyType): val is symbol {
  return typeof val === 'symbol';
}

/**
 * @description 检查给定参数是否为string。只适用于string类型。
 * 使用typeof检查值是否为 string 类型。
 * @export
 * @param val 任意值
 * @returns 如果指定值是string类型，则返回true，否则返回false。
 */
export function isString(val: AnyType): val is string {
  return typeof val === 'string';
}

/**
 * @description 检查给定的参数是否是 number。
 * 使用typeof检查值是否为 number 类型。
 * 为了防止NaN，检查val === val(因为NaN 的类型是 number，并且是惟一不等于自身的值)。
 * @export
 * @param val 任意值
 * @returns 如果指定值是number类型，并且不是NaN，则返回true，否则返回false。
 */
export function isNumber(val: AnyType): val is number {
  return typeof val === 'number' && val === val;
}


/**
 * @description 检查给定的参数是否是整型数字。
 * 检查参数是否是数字，使用isFinite()检查数字是否有限。确保位处理以后等于自己。
 * @export
 * @param val 任意值
 * @returns 如果指定值是整型数字类型，则返回true，否则返回false。
 */
export function isInteger(val: AnyType): val is number {
  return isNumber(val) && isFinite(val) && Math.floor(val) === val;
}

/**
 * @description 检查给定的参数是否是 null。
 * 使用严格的相等运算符检查 val 的值和值是否等于null。
 * @export
 * @param val 任意值
 * @returns 如果指定值是null，则返回true，否则返回false。
 */
export function isNull(val: AnyType): val is null {
  return val === null;
}

/**
 * @description 检查给定的参数是否是 function。
 * 使用typeof检查值是否为 function 类型。
 * @export
 * @param val 任意值
 * @returns 如果指定值是function类型，则返回true，否则返回false。
 */
export function isFunction<T = AnyType>(val: AnyType): val is (...reset: Array<AnyType>) => T {
  return typeof val === 'function';
}

/**
 * @description 检查给定的参数是否是 boolean。
 * 使用typeof检查值是否为 boolean 类型。
 * @export
 * @param val 任意值
 * @returns 如果指定值是boolean类型，则返回true，否则返回false。
 */
export function isBoolean(val: AnyType): val is boolean {
  return typeof val === 'boolean';
}

/**
 * @description 检查给定的参数是否是 null 或 undefined。
 * 使用严格的相等运算符检查 val 的值和值是否等于 null或 undefined。
 * @export
 * @template T
 * @param val 任意值
 * @returns 如果指定值为 null 或 undefined，则返回true，否则返回false。
 */
export function isNil<T = undefined | null>(val: AnyType): val is T {
  return val === undefined || val === null;
}

/**
 * @description 检查给定的参数是否是原始的类型（null|boolean|number|string|symbol）。
 * 从val创建一个对象，并将其与val进行比较，以确定传递的值是否为原始(即不等于创建的对象)。
 * @export
 * @param val 任意值
 * @returns 如果指定值为原始类型，则返回true，否则返回false。
 */
export function isPrimitive<T = null | boolean | number | string | symbol>(val: AnyType): val is T {
  return Object(val) !== val;
}

/**
 * @description 检查给定的参数是否是 Promise。
 * 检查对象是否为空，它的类型是否匹配对象或函数，以及它是否具有.then属性，这也是一个函数。
 * @export
 * @template T
 * @param val 任意值
 * @returns 如果指定值为Promise，则返回true，否则返回false。
 */
export function isPromise<T = AnyType>(val: AnyType): val is Promise<T> {
  return val !== null && (typeof val === 'object' || typeof val === 'function') && typeof (val as Promise<T>).then === 'function';
}

/**
 * @description 检查给定的参数是否是 array。
 * 使用Array.isArray检查值是否为 array 类型。
 * @export
 * @template T
 * @param val 任意值
 * @returns 如果指定值为array，则返回true，否则返回false。
 */
export function isArray<T = AnyType>(val: AnyType): val is T[] {
  return Array.isArray(val);
}

/**
 * @description 检查提供的参数是否类似于数组(即是可迭代的)。
 * 比如 字符串 dom集合 等
 * @export
 * @template T
 * @param val 任意值
 * @returns 检查提供的参数是否不为 null，以及它的 Symbol.iterator 属性是一个函数。
 */
export function isArrayLike<T = AnyType>(val: AnyType): val is ArrayLike<T> {
  return val != null && !isFunction(val) && isLength(val.length);
}

const MAX_SAFE_INTEGER = 9007199254740991;

/**
 * @description 检查提供的参数是否合法length
 * @export
 * @param val 任意值
 * @returns 检查提供的参数是否不为 null，以及它的 Symbol.iterator 属性是一个函数。
 */
export function isLength(val: AnyType): val is number {
  return isNumber(val) && val > -1 && val % 1 === 0 && val <= MAX_SAFE_INTEGER;
}

/**
 * @description 检查给定的参数是否是 object。
 * 使用对象构造函数为给定值创建对象包装器。
 * 如果值为null或undefined，则创建并返回一个空对象。其他返回一个对象的类型,对应于给定的值。
 * @export
 * @param val 任意值
 * @returns 如果指定值为object，则返回true，否则返回false。
 */
export function isObject(val: AnyType): val is object {
  return val === Object(val);
}

/**
 * @description 检查值是否为object-like。
 * 例如 JSON Array Date RegExp Map Set...
 * 检查提供的值是否不为null，其类型是否等于'object'。
 * @export
 * @param val 任意值
 * @returns 如果指定值为object，则返回true，否则返回false。
 */
export function isObjectLike(val: AnyType): val is object {
  return typeof val === 'object' && val !== null;
}
/**
 * @description 检查提供的值是否为对象构造函数创建的对象。
 * 检查提供的值是否为true，使用typeof检查它是否是一个 object 和 Object.constructor，以确保构造函数等于Object。
 * @export
 * @param val 任意值
 * @returns 如果指定值为对象构造函数创建的对象，则返回true，否则返回false。
 */
export function isPlainObject(val: AnyType): val is object {
  if (!isObjectLike(val) || getTypeTag(val) !== objectTag) {
    return false;
  }
  if (Object.getPrototypeOf(val) === null) {
    return true;
  }
  let proto = val;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }
  return Object.getPrototypeOf(val) === proto;
}

/**
 * @description 检查提供的字符串是否是有效的JSON。使用 JSON.parse() 并 try/catch 块检查提供的字符串是否是有效的JSON。
 * @export
 * @param text 字符串
 * @returns 如果指定值是有效的JSON，则返回true，否则返回false。
 */
export function isValidJSON(text: string): boolean {
  // 如果指定值 不是字符串，则返回false。减少JSON.parse解析错误问题。
  if (!isString(text)) {
    return false;
  }
  try {
    JSON.parse(text);
    return true;
  } catch (unusedVariable) {
    return false;
  }
}

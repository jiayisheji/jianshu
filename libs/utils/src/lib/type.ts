/**
 * `Object#toString` 结果引用
 */
export const argsTag = '[object Arguments]';
export const arrayTag = '[object Array]';
export const boolTag = '[object Boolean]';
export const dateTag = '[object Date]';
export const errorTag = '[object Error]';
export const funcTag = '[object Function]';
export const genTag = '[object GeneratorFunction]';
export const mapTag = '[object Map]';
export const numberTag = '[object Number]';
export const objectTag = '[object Object]';
export const promiseTag = '[object Promise]';
export const regexpTag = '[object RegExp]';
export const setTag = '[object Set]';
export const stringTag = '[object String]';
export const symbolTag = '[object Symbol]';
export const weakMapTag = '[object WeakMap]';

const objectToString = Object.prototype.toString;

/**
 * @description 获取当前值Object#toString类型
 * @export
 * @param value 任意值
 * @returns 返回类型 例如：'[object Array]'
 */
// tslint:disable-next-line: no-any
export function getTypeTag(value: any): string {
  return objectToString.call(value);
}

/**
 * @description 获取当前值Object#toString处理后类型
 * @export
 * @param target 任意值
 * @returns 返回类型 例如：'[object Array]' => 'Array'
 */
// tslint:disable-next-line: no-any
export function getType(target: any): string {
  return objectToString.call(target).match(/^\[object (.*)]$/)[1];
}

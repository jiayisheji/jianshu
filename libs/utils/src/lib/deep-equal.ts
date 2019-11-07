/**
 * @description 判断两个值是否相等
 * @export
 * @param {*} value
 * @param {*} other
 * @returns {boolean} 两个值相等为true，否则为false
 */
export function deepEqual(value: any, other: any): boolean {
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
  // 如果是数组
  if (Array.isArray(value) && Array.isArray(other)) {
    if (value.length !== other.length) {
      return false;
    }
    return value.every((item, i) => deepEqual(item, other[i]));
  }
  // 如果是对象
  const keys = Object.keys(value);
  if (keys.length !== Object.keys(other).length) {
    return false;
  }
  return keys.every(k => deepEqual(value[k], other[k]));
}

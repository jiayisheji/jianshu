/**
 * @description 深度克隆
 * @export
 * @param {object} obj
 * @returns {object}
 */
export function deepClone(obj: object): object {
  // 原始类型直接返回
  if (Object(obj) !== obj) {
    return obj;
  }
  // 浅拷贝
  const clone = Object.assign({}, obj);
  // 处理深拷贝
  Object.keys(clone).forEach(key => (clone[key] = typeof obj[key] === 'object' ? deepClone(obj[key]) : obj[key]));
  // 处理原型
  Object.setPrototypeOf(clone, Object.getPrototypeOf(obj));
  // 处理数组和其他对象
  if (Array.isArray(obj) && obj.length) {
    // tslint:disable-next-line: no-any
    (clone as any[]).length = obj.length;
    // tslint:disable-next-line: no-any
    return Array.from(clone as any[]);
  } else {
    if (Array.isArray(obj)) {
      return Array.from(obj);
    } else {
      return clone;
    }
  }
}

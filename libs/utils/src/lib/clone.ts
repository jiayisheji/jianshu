import { getType } from './type';
import { isFunction } from './typeof';
import { AnyType } from './types';

type CloneCache = WeakMap<object, AnyType>;

const objectProto = Object.prototype;

function isPrototype(value: AnyType): boolean {
  const Ctor = value && value.constructor;
  const proto = (isFunction(Ctor) && Ctor.prototype) || objectProto;
  return value === proto;
}

export function initCloneObject(object: AnyType) {
  return isFunction(object.constructor) && !isPrototype(object) ? Object.create(Object.getPrototypeOf(object)) : {};
}

export function copyArray(source: AnyType) {
  let index = -1
  const length = source.length

  const array = new Array(length);
  while (++index < length) {
    array[index] = source[index]
  }
  return array
}

/** 用于从强制字符串值匹配' RegExp '标志。 */
const reFlags = /\w*$/;

function cloneRegExp(regexp: AnyType): RegExp {
  const result = new regexp.constructor(regexp.source, reFlags.exec(regexp));
  result.lastIndex = regexp.lastIndex;
  return result;
}

const symbolProto = Symbol ? Symbol.prototype : undefined;
const symbolValueOf = symbolProto ? symbolProto.valueOf : undefined;
function cloneSymbol(symbol: AnyType): symbol {
  return symbolValueOf ? Object(symbolValueOf.call(symbol)) : {};
}

function forEach<T>(target: T[], callback: (value: T, key: number) => void): void {
  let index = -1;
  const length = target.length;
  while (++index < length) {
    callback(target[index], index);
  }
}

const typesConfig = {
  Array: {

    copy(target: AnyType[], cache: CloneCache): AnyType[] {
      const result = new Array(target.length);
      forEach(target, (value, key) => {
        result[key] = clone(value, cache);
      });
      return result;
    },
  },
  Boolean: {
    // tslint:disable-next-line: ban-types
    copy(target: Boolean): Boolean {
      // tslint:disable-next-line: no-construct
      return new Boolean(+target);
    },
  },
  Date: {
    copy(target: Date): Date {
      return new Date(target);
    },
  },
  Error: {
    copy(target: Error): Error {
      return new Error(target.message);
    },
  },
  Map: {

    copy(target: Map<AnyType, AnyType>, cache: CloneCache): Map<AnyType, AnyType> {
      const result = new Map();
      target.forEach((value, key) => {
        result.set(clone(key, cache), clone(value, cache));
      });
      return result;
    },
  },
  Number: {
    // tslint:disable-next-line: ban-types
    copy(target: Number): Number {
      // tslint:disable-next-line: no-construct
      return new Number(target);
    },
  },
  Object: {

    copy(target: object, cache: CloneCache): object {
      const result = initCloneObject(target);
      cache.set(target, result);
      forEach(Object.keys(target), key => {
        result[key] = clone(target[key], cache);
      });
      return result;
    },
  },
  RegExp: {
    copy(target: RegExp): RegExp {
      return cloneRegExp(target);
    },
  },
  Set: {

    copy(target: Set<AnyType>, cache: CloneCache): Set<AnyType> {
      const result = new Set();
      target.forEach(value => {
        result.add(clone(value, cache));
      });
      return result;
    },
  },
  String: {
    // tslint:disable-next-line: ban-types
    copy(target: String): String {
      // tslint:disable-next-line: no-construct
      return new String(target);
    },
  },
  Symbol: {
    // tslint:disable-next-line: ban-types
    copy(target: Symbol): Symbol {
      return cloneSymbol(target);
    },
  },
};

/**
 * @description 深度克隆
 * @export
 * @param target 克隆目标
 * @param cache 缓存 解决循环依赖问题
 * @returns 克隆目标的值
 */
export function clone<T>(target: T): T;
// tslint:disable-next-line: unified-signatures
export function clone<T>(target: T, cache?: WeakMap<object, T>): T;
export function clone<T>(target: T, cache: WeakMap<object, T> = new WeakMap()): T {
  // 原始类型、null、undefined和函数直接返回
  if (typeof target !== 'object' || target == null) {
    return target;
  }

  // 防止循环引用 循环引用处理。有缓存，直接返回缓存值
  if (cache.get((target as unknown) as object)) {
    return cache.get((target as unknown) as object);
  }

  // 获取实际类型
  const typeConfig = typesConfig[getType(target)];

  let result: T;
  // 优先处理已知类型
  if (typeConfig) {
    result = typeConfig.copy(target, cache);
    // 设置原型
    Object.setPrototypeOf(result, Object.getPrototypeOf(target));
  } else {
    result = initCloneObject(target);
  }
  // 未知的
  return result as T;
}

import { toBoolean, toNumber } from '@jianshu/utils';
import { ValueHook } from './value-hook';

export function BooleanHook<T, K = boolean>(setter?: (key?: symbol, value?: K) => boolean | void, getter?: (value?: K) => K) {
  return ValueHook<T, K>(function (key: symbol, value: K) {
    this[key] = toBoolean(value);
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter);
}

export function NumberHook<T, K = boolean>(setter?: (key?: symbol, value?: K) => boolean | void, getter?: (value?: K) => K) {
  return ValueHook<T, K>(function (key: symbol, value: K) {
    this[key] = toNumber(value);
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter);
}

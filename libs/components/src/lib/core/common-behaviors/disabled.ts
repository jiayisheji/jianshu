import { ValueHook } from './value-hook';
import { toBoolean } from '@jianshu/utils';

export function BooleanHook<T, K = boolean>(
  setter?: (key?: symbol, value?: K) => boolean | void,
  getter?: (value?: K) => K,
) {
  return ValueHook<T, K>(function (key: symbol, value: K) {
    this[key] = toBoolean(value);
    if (setter) {
      setter.call(this, key, value);
    }
    return false;
  }, getter)
}

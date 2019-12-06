const checkDescriptor = <T, K extends keyof T>(target: T, propertyKey: K) => {
  const descriptor = Object.getOwnPropertyDescriptor(target, propertyKey);

  if (descriptor && !descriptor.configurable) {
    throw new TypeError(`property ${propertyKey} is not configurable`);
  }

  return {
    oGetter: descriptor && descriptor.get,
    oSetter: descriptor && descriptor.set,
  };
};

/**
 * @description 劫持属性值
 * @export
 * @template T
 * @template K
 * @param {((this: T, key?: symbol, value?: T[K]) => boolean | void)} [setter]
 * @param {(this: T, value?: T[K]) => T[K]} [getter]
 * @returns
 * @example
 * ValueHook 回调函数里面不要使用箭头函数
 * @Component({})
 * export class DemoComponent {
 *    @ValueHook(function(key, value) {
 *       // do something
 *       // 如果需要修改值需要返回false
 *       this[key] = value;
 *       return false;
 *    },
 *    function(value) {
 *      // do something
 *      // 需要返回的值
 *      return value
 *    })
 *    @Input()
 *    name: string;
 * }
 */
export function ValueHook<T, K>(setter?: (key?: symbol, value?: K) => boolean | void, getter?: (value?: K) => K) {
  return (target: T, propertyKey: keyof T) => {
    const { oGetter, oSetter } = checkDescriptor(target, propertyKey);

    const symbol = Symbol();

    type Mixed = T & {
      [symbol]: K;
    };

    Object.defineProperty(target, propertyKey, {
      enumerable: true,
      configurable: true,
      get(this: Mixed) {
        return getter && this[symbol] !== undefined ? getter.call(this, this[symbol]) : oGetter ? oGetter.call(this) : this[symbol];
      },
      set(this: Mixed, value: K) {
        // tslint:disable-next-line: no-any
        if (value === ((this[propertyKey] as any) as K) || (setter && setter.call(this, symbol, value) === false)) {
          return;
        }
        if (oSetter) {
          oSetter.call(this, symbol, value);
        }
        this[symbol] = value;
      },
    });
  };
}

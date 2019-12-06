import { isDevMode } from '@angular/core';
import { AnyType } from '@jianshu/utils';

/**
 * @description 弃用方法
 * @export
 * @param message 弃用说明
 * @returns
 */
export function DeprecateMethod<T>(message: string): MethodDecorator {
  let isMessageShown = false;
  return (target: T, key: string, descriptor: PropertyDescriptor) => {
    if (descriptor && descriptor.value) {
      const originalMethod = descriptor.value;

      descriptor.value = function () {
        const targetName = typeof target === 'function' ? target.name : target.constructor.name;
        isMessageShown = showMessage(`${targetName}.${key}: ${message}`, isMessageShown);

        return originalMethod.call(this, arguments);
      };

      return descriptor;
    }
  };
}

/**
 * @description 弃用属性
 * @export
 * @param message 弃用说明
 * @returns
 */
export function DeprecateProperty<T>(message: string): PropertyDecorator {
  return (target: T, key: string) => {
    let isMessageShown = false;
    const messageToDisplay = `${target.constructor.name}.${key}: ${message}`;

    // 如果目标已经定义了属性
    const originalDescriptor = Object.getOwnPropertyDescriptor(target, key);
    if (originalDescriptor) {
      let getter: () => AnyType;
      let setter: (v: AnyType) => void;
      getter = originalDescriptor.get;
      setter = originalDescriptor.set;

      if (getter) {
        originalDescriptor.get = function () {
          isMessageShown = showMessage(messageToDisplay, isMessageShown);
          return getter.call(this);
        };
      }

      if (setter) {
        originalDescriptor.set = function (value) {
          isMessageShown = showMessage(messageToDisplay, isMessageShown);
          setter.call(this, value);
        };
      }

      return originalDescriptor;
    }

    // 目标不包含该属性的描述符，因此创建一个use backing字段来 set/get 该属性的值，以确保不会出现无限递归调用
    const newKey = generateUniqueKey(target, key);
    Object.defineProperty(target, key, {
      configurable: true,
      enumerable: true,
      set(value) {
        isMessageShown = showMessage(messageToDisplay, isMessageShown);
        this[newKey] = value;
      },
      get() {
        isMessageShown = showMessage(messageToDisplay, isMessageShown);
        return this[newKey];
      },
    });
  };
}

/**
 * @description 生成一个唯一对象属性key
 * @param target
 * @param key
 * @returns
 */
function generateUniqueKey(target: AnyType, key: string): string {
  let newKey = '_' + key;
  while (target.hasOwnProperty(newKey)) {
    newKey = '_' + newKey;
  }
  return newKey;
}

/**
 * @description 显示警告消息
 * @export
 * @param message
 * @param isMessageShown
 * @returns
 */
export function showMessage(message: string, isMessageShown: boolean): boolean {
  if (!isMessageShown && isDevMode()) {
    console.warn('[SIMPLE-UI]:', 'deprecated:', message);
  }
  return true;
}

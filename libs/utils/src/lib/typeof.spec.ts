import { isArray, isBoolean, isFunction, isInteger, isNil, isNull, isNumber, isObject, isObjectLike, isPlainObject, isPrimitive, isPromise, isString, isSymbol, isUndefined } from "./typeof";

const symbol = Symbol('Symbol');

describe('isNull', () => {
  it('should return `true` for `null` values', () => {
    expect(isNull(null)).toBeTruthy();
  });

  it('should return `false` for non `null` values', (...args) => {
    expect(isNull(args)).toBeFalsy();
    expect(isNull([1, 2, 3])).toBeFalsy();
    expect(isNull(true)).toBeFalsy();
    expect(isNull(new Date)).toBeFalsy();
    expect(isNull(new Error)).toBeFalsy();
    expect(isNull({ 'a': 1 })).toBeFalsy();
    expect(isNull(Array.prototype.slice)).toBeFalsy();
    expect(isNull(1)).toBeFalsy();
    expect(isNull(/x/)).toBeFalsy();
    expect(isNull('a')).toBeFalsy();
    expect(isNull(symbol)).toBeFalsy();
  });

});

describe('isUndefined', () => {
  it('should return `true` for `undefined` values', () => {
    expect(isUndefined(undefined)).toBeTruthy();
  });

  it('should return `false` for non `undefined` values', (...args) => {
    expect(isUndefined(args)).toBeFalsy();
    expect(isUndefined([1, 2, 3])).toBeFalsy();
    expect(isUndefined(true)).toBeFalsy();
    expect(isUndefined(new Date)).toBeFalsy();
    expect(isUndefined(new Error)).toBeFalsy();
    expect(isUndefined({ 'a': 1 })).toBeFalsy();
    expect(isUndefined(Array.prototype.slice)).toBeFalsy();
    expect(isUndefined(1)).toBeFalsy();
    expect(isUndefined(/x/)).toBeFalsy();
    expect(isUndefined('a')).toBeFalsy();
    expect(isUndefined(symbol)).toBeFalsy();
  });

});

describe('isSymbol', () => {
  it('should return `true` for `symbol` values', () => {
    expect(isSymbol(symbol)).toBeTruthy();
  });

  it('should return `false` for non `symbol` values', (...args) => {
    expect(isSymbol(args)).toBeFalsy();
    expect(isSymbol([1, 2, 3])).toBeFalsy();
    expect(isSymbol(true)).toBeFalsy();
    expect(isSymbol(new Date)).toBeFalsy();
    expect(isSymbol(new Error)).toBeFalsy();
    expect(isSymbol({ 'a': 1 })).toBeFalsy();
    expect(isSymbol(Array.prototype.slice)).toBeFalsy();
    expect(isSymbol(1)).toBeFalsy();
    expect(isSymbol(/x/)).toBeFalsy();
    expect(isSymbol('a')).toBeFalsy();
  });

});

describe('isString', () => {
  it('should return `true` for `string` values', () => {
    expect(isString('string')).toBeTruthy();
  });

  it('should return `false` for non `string` values', (...args) => {
    expect(isString(args)).toBeFalsy();
    expect(isString([1, 2, 3])).toBeFalsy();
    expect(isString(true)).toBeFalsy();
    expect(isString(new Date)).toBeFalsy();
    expect(isString(new Error)).toBeFalsy();
    expect(isString({ 'a': 1 })).toBeFalsy();
    expect(isString(Array.prototype.slice)).toBeFalsy();
    expect(isString(1)).toBeFalsy();
    expect(isString(/x/)).toBeFalsy();
    expect(isString(symbol)).toBeFalsy();
  });

});


describe('isNumber', () => {
  it('should return `true` for `number` values', () => {
    expect(isNumber(1)).toBeTruthy();
  });

  it('should return `false` for non `number` values', (...args) => {
    expect(isNumber(args)).toBeFalsy();
    expect(isNumber([1, 2, 3])).toBeFalsy();
    expect(isNumber(true)).toBeFalsy();
    expect(isNumber(new Date)).toBeFalsy();
    expect(isNumber(new Error)).toBeFalsy();
    expect(isNumber({ 'a': 1 })).toBeFalsy();
    expect(isNumber(Array.prototype.slice)).toBeFalsy();
    expect(isNumber(/x/)).toBeFalsy();
    expect(isNumber(symbol)).toBeFalsy();
    expect(isNumber('a')).toBeFalsy();
    expect(isNumber(+'a1')).toBeFalsy();
  });

});

describe('isInteger', () => {
  it('should return `true` for `integer` values', () => {
    expect(isInteger(1)).toBeTruthy();
  });

  it('should return `false` for non `integer` values', (...args) => {
    expect(isInteger(args)).toBeFalsy();
    expect(isInteger([1, 2, 3])).toBeFalsy();
    expect(isInteger(true)).toBeFalsy();
    expect(isInteger(new Date)).toBeFalsy();
    expect(isInteger(new Error)).toBeFalsy();
    expect(isInteger({ 'a': 1 })).toBeFalsy();
    expect(isInteger(Array.prototype.slice)).toBeFalsy();
    expect(isInteger(/x/)).toBeFalsy();
    expect(isInteger(symbol)).toBeFalsy();
    expect(isInteger('a')).toBeFalsy();
    expect(isInteger(+'a1')).toBeFalsy();
    expect(isInteger(1.1)).toBeFalsy();
  });

});

describe('isFunction', () => {
  it('should return `true` for `function` values', () => {
    expect(isFunction(() => { })).toBeTruthy();
    class Fun { }
    expect(isFunction(Fun)).toBeTruthy();
    expect(isFunction(Object.assign)).toBeTruthy();
    expect(isFunction(Array.prototype.slice)).toBeTruthy();
  });

  it('should return `false` for non `function` values', (...args) => {
    expect(isFunction(args)).toBeFalsy();
    expect(isFunction([1, 2, 3])).toBeFalsy();
    expect(isFunction(true)).toBeFalsy();
    expect(isFunction(new Date)).toBeFalsy();
    expect(isFunction(new Error)).toBeFalsy();
    expect(isFunction({ 'a': 1 })).toBeFalsy();
    expect(isFunction(/x/)).toBeFalsy();
    expect(isFunction('a')).toBeFalsy();
    expect(isFunction(+'a1')).toBeFalsy();
  });

});

describe('isBoolean', () => {
  it('should return `true` for `boolean` values', () => {
    expect(isBoolean(true)).toBeTruthy();
  });

  it('should return `false` for non `boolean` values', (...args) => {
    expect(isBoolean(args)).toBeFalsy();
    expect(isBoolean([1, 2, 3])).toBeFalsy();
    expect(isBoolean(new Date)).toBeFalsy();
    expect(isBoolean(new Error)).toBeFalsy();
    expect(isBoolean({ 'a': 1 })).toBeFalsy();
    expect(isBoolean(/x/)).toBeFalsy();
    expect(isBoolean('a')).toBeFalsy();
    expect(isBoolean(+'a1')).toBeFalsy();
    expect(isBoolean('true')).toBeFalsy();
    expect(isBoolean(1)).toBeFalsy();
  });

});

describe('isNil', () => {
  it('should return `true` for `nil` values', () => {
    expect(isNil(undefined)).toBeTruthy();
    expect(isNil(null)).toBeTruthy();
    expect(isNil(void 0)).toBeTruthy();
    // tslint:disable-next-line: no-any, prefer-const
    let a;
    expect(isNil(a)).toBeTruthy();
  });

  it('should return `false` for non `nil` values', (...args) => {
    expect(isNil(args)).toBeFalsy();
    expect(isNil([1, 2, 3])).toBeFalsy();
    expect(isNil(new Date)).toBeFalsy();
    expect(isNil(new Error)).toBeFalsy();
    expect(isNil({ 'a': 1 })).toBeFalsy();
    expect(isNil(/x/)).toBeFalsy();
    expect(isNil('a')).toBeFalsy();
    expect(isNil(+'a1')).toBeFalsy();
    expect(isNil('true')).toBeFalsy();
    expect(isNil(0)).toBeFalsy();
  });

});

describe('isPrimitive', () => {
  it('should return `true` for `nil` values', () => {
    expect(isPrimitive(undefined)).toBeTruthy();
    expect(isPrimitive(null)).toBeTruthy();
    expect(isPrimitive(void 0)).toBeTruthy();
    expect(isPrimitive(true)).toBeTruthy();
    expect(isPrimitive(false)).toBeTruthy();
    expect(isPrimitive(1)).toBeTruthy();
    expect(isPrimitive('string')).toBeTruthy();
    expect(isPrimitive(symbol)).toBeTruthy();
    expect(isPrimitive(symbol)).toBeTruthy();
  });

  it('should return `false` for non `nil` values', (...args) => {
    expect(isPrimitive(args)).toBeFalsy();
    expect(isPrimitive([1, 2, 3])).toBeFalsy();
    expect(isPrimitive(new Date)).toBeFalsy();
    expect(isPrimitive(new Error)).toBeFalsy();
    expect(isPrimitive({ 'a': 1 })).toBeFalsy();
    expect(isPrimitive(/x/)).toBeFalsy();
  });

});

describe('isArray', () => {
  it('should return `true` for `array` values', (...args) => {
    expect(isArray([])).toBeTruthy();
    expect(isArray(new Array())).toBeTruthy();
    expect(isArray(args)).toBeTruthy();
  });

  it('should return `false` for non `array` values', () => {
    expect(isArray(new Date)).toBeFalsy();
    expect(isArray(new Error)).toBeFalsy();
    expect(isArray({ 'a': 1 })).toBeFalsy();
    expect(isArray(/x/)).toBeFalsy();
    expect(isArray('abcd')).toBeFalsy();
  });

});

describe('isObject', () => {
  it('should return `true` for `array` values', (...args) => {
    expect(isObject([])).toBeTruthy();
    expect(isObject(new Array())).toBeTruthy();
    expect(isObject(args)).toBeTruthy();
    expect(isObject(new Date)).toBeTruthy();
    expect(isObject(new Error)).toBeTruthy();
    expect(isObject({ 'a': 1 })).toBeTruthy();
    expect(isObject(/x/)).toBeTruthy();
  });

  it('should return `false` for non `array` values', () => {
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(void 0)).toBeFalsy();
    expect(isObject(true)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject('string')).toBeFalsy();
    expect(isObject(symbol)).toBeFalsy();
  });

});

describe('isObject', () => {
  it('should return `true` for `object` values', (...args) => {
    expect(isObject([])).toBeTruthy();
    expect(isObject(new Array())).toBeTruthy();
    expect(isObject(args)).toBeTruthy();
    expect(isObject(new Date)).toBeTruthy();
    expect(isObject(new Error)).toBeTruthy();
    expect(isObject({ 'a': 1 })).toBeTruthy();
    expect(isObject(/x/)).toBeTruthy();
  });

  it('should return `false` for non `object` values', () => {
    expect(isObject(undefined)).toBeFalsy();
    expect(isObject(null)).toBeFalsy();
    expect(isObject(void 0)).toBeFalsy();
    expect(isObject(true)).toBeFalsy();
    expect(isObject(false)).toBeFalsy();
    expect(isObject(1)).toBeFalsy();
    expect(isObject('string')).toBeFalsy();
    expect(isObject(symbol)).toBeFalsy();
  });

});

describe('isObjectLike', () => {
  it('should return `true` for `object-like` values', (...args) => {
    expect(isObjectLike([])).toBeTruthy();
    expect(isObjectLike(new Array())).toBeTruthy();
    expect(isObjectLike(args)).toBeTruthy();
    expect(isObjectLike(new Date)).toBeTruthy();
    expect(isObjectLike(new Error)).toBeTruthy();
    expect(isObjectLike({ 'a': 1 })).toBeTruthy();
    expect(isObjectLike(/x/)).toBeTruthy();
  });

  it('should return `false` for non `object-like` values', () => {
    expect(isObjectLike(undefined)).toBeFalsy();
    expect(isObjectLike(null)).toBeFalsy();
    expect(isObjectLike(void 0)).toBeFalsy();
    expect(isObjectLike(true)).toBeFalsy();
    expect(isObjectLike(false)).toBeFalsy();
    expect(isObjectLike(1)).toBeFalsy();
    expect(isObjectLike('string')).toBeFalsy();
    expect(isObjectLike(symbol)).toBeFalsy();
  });

});

describe('isPlainObject', () => {
  it('should return `true` for `object-like` values', () => {
    expect(isPlainObject({ 'a': 1 })).toBeTruthy();
  });

  it('should return `false` for non `object-like` values', (...args) => {
    expect(isPlainObject(undefined)).toBeFalsy();
    expect(isPlainObject([])).toBeFalsy();
    expect(isPlainObject(new Array())).toBeFalsy();
    expect(isPlainObject(args)).toBeFalsy();
    expect(isPlainObject(new Date)).toBeFalsy();
    expect(isPlainObject(new Error)).toBeFalsy();
    expect(isPlainObject(/x/)).toBeFalsy();
    expect(isPlainObject(null)).toBeFalsy();
    expect(isPlainObject(void 0)).toBeFalsy();
    expect(isPlainObject(true)).toBeFalsy();
    expect(isPlainObject(false)).toBeFalsy();
    expect(isPlainObject(1)).toBeFalsy();
    expect(isPlainObject('string')).toBeFalsy();
    expect(isPlainObject(symbol)).toBeFalsy();
  });

});


describe('isPromise', () => {
  it('should return `true` for `promise` values', () => {
    expect(isPromise({
      then: function () {
        return '';
      }
    })).toBeTruthy();
  });

  it('should return `false` for non `promise` values', (...args) => {
    expect(isPromise(undefined)).toBeFalsy();
    expect(isPromise([])).toBeFalsy();
    expect(isPromise(new Array())).toBeFalsy();
    expect(isPromise(args)).toBeFalsy();
    expect(isPromise(new Date)).toBeFalsy();
    expect(isPromise(new Error)).toBeFalsy();
    expect(isPromise(/x/)).toBeFalsy();
    expect(isPromise(null)).toBeFalsy();
    expect(isPromise(void 0)).toBeFalsy();
    expect(isPromise(true)).toBeFalsy();
    expect(isPromise(false)).toBeFalsy();
    expect(isPromise(1)).toBeFalsy();
    expect(isPromise('string')).toBeFalsy();
    expect(isPromise(symbol)).toBeFalsy();
  });

});

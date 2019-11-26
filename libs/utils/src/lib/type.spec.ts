import {
  argsTag,
  arrayTag,
  boolTag,
  dateTag,
  errorTag,
  funcTag,
  getType,
  getTypeTag,
  mapTag,
  numberTag,
  objectTag,
  regexpTag,
  setTag,
  stringTag,
  symbolTag,
} from './type';

describe('getTypeTag', () => {
  it('should return `[object Xxxx]` for `getTypeTag` values', (...args) => {
    expect(getTypeTag('')).toEqual(stringTag);
    // tslint:disable-next-line: only-arrow-functions
    (function (a) {
      expect(getTypeTag(arguments)).toEqual(argsTag);
    })(1);
    expect(getTypeTag(args)).toEqual(arrayTag);
    expect(getTypeTag(true)).toEqual(boolTag);
    expect(getTypeTag(false)).toEqual(boolTag);
    expect(getTypeTag(new Date())).toEqual(dateTag);
    expect(getTypeTag(new Error())).toEqual(errorTag);
    expect(getTypeTag(Error)).toEqual(funcTag);
    class A { }
    expect(getTypeTag(A)).toEqual(funcTag);
    expect(getTypeTag(() => { })).toEqual(funcTag);
    expect(getTypeTag(new Map())).toEqual(mapTag);
    expect(getTypeTag(123)).toEqual(numberTag);
    expect(getTypeTag({})).toEqual(objectTag);
    expect(getTypeTag(new Object())).toEqual(objectTag);
    expect(getTypeTag(/1/)).toEqual(regexpTag);
    expect(getTypeTag(new Set())).toEqual(setTag);
    expect(getTypeTag(Symbol(111))).toEqual(symbolTag);
  });
});

describe('getType', () => {
  it('should return `Xxxx` for `getType` values', (...args) => {
    expect(getType('')).toEqual('String');
    // tslint:disable-next-line: only-arrow-functions
    (function (a) {
      expect(getType(arguments)).toEqual('Arguments');
    })(1);
    expect(getType(args)).toEqual('Array');
    expect(getType(true)).toEqual('Boolean');
    expect(getType(false)).toEqual('Boolean');
    expect(getType(new Date())).toEqual('Date');
    expect(getType(new Error())).toEqual('Error');
    expect(getType(Error)).toEqual('Function');
    class A { }
    expect(getType(A)).toEqual('Function');
    expect(getType(() => { })).toEqual('Function');
    expect(getType(new Map())).toEqual('Map');
    expect(getType(123)).toEqual('Number');
    expect(getType({})).toEqual('Object');
    expect(getType(new Object())).toEqual('Object');
    expect(getType(/1/)).toEqual('RegExp');
    expect(getType(new Set())).toEqual('Set');
    expect(getType(Symbol(111))).toEqual('Symbol');
  });
});

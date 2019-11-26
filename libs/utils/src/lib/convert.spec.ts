import { toArray, toBoolean, toJson, toNumber } from './convert';

describe('toArray', () => {
  it('should return `array` for `toArray` values', () => {
    const stringVal = 'just a string';
    expect(toArray(stringVal)).toEqual([stringVal]);
    const numberVal = 123;
    expect(toArray(numberVal)).toEqual([numberVal]);
    const objectVal = { something: 'clever' };
    expect(toArray(objectVal)).toEqual([objectVal]);
    const nullVal = null;
    expect(toArray(nullVal)).toEqual([nullVal]);
    const undefinedVal = undefined;
    expect(toArray(undefinedVal)).toEqual([undefinedVal]);
    const arrayVal = [1, 2, 3];
    expect(toArray(arrayVal)).toEqual(arrayVal);
  });
});

describe('toBoolean', () => {
  it('should return `false` for `toBoolean` values', () => {
    expect(toBoolean(undefined)).toBeFalsy();
    expect(toBoolean(null)).toBeFalsy();
    expect(toBoolean('false')).toBeFalsy();
    expect(toBoolean(false)).toBeFalsy();
  });

  it('should return `true` for `toBoolean` values', () => {
    expect(toBoolean([])).toBeTruthy();
    expect(toBoolean({})).toBeTruthy();
    expect(toBoolean('')).toBeTruthy();
    expect(toBoolean(0)).toBeTruthy();
    expect(toBoolean('toBoolean')).toBeTruthy();
    expect(toBoolean(1)).toBeTruthy();
    expect(toBoolean('true')).toBeTruthy();
    expect(toBoolean(true)).toBeTruthy();
  });
});

describe('toNumber', () => {
  it('should return `0 or default` for `toNumber` values', () => {
    expect(toNumber(undefined)).toBe(0);
    expect(toNumber(undefined, 111)).toBe(111);
    expect(toNumber(null)).toBe(0);
    expect(toNumber(null, 111)).toBe(111);
    expect(toNumber(true)).toBe(0);
    expect(toNumber(true, 111)).toBe(111);
    expect(toNumber(false)).toBe(0);
    expect(toNumber(false, 111)).toBe(111);
    expect(toNumber('')).toBe(0);
    expect(toNumber('', 111)).toBe(111);
    expect(toNumber('default')).toBe(0);
    expect(toNumber('default', 111)).toBe(111);
    expect(toNumber('123default')).toBe(0);
    expect(toNumber('123default', 111)).toBe(111);
    expect(toNumber({})).toBe(0);
    expect(toNumber({}, 111)).toBe(111);
    expect(toNumber([])).toBe(0);
    expect(toNumber([], 111)).toBe(111);
  });

  it('should return `number to number` for `toNumber` values', () => {
    expect(toNumber(1)).toBe(1);
    expect(toNumber(1, 111)).toBe(1);
    expect(toNumber(123.456)).toBe(123.456);
    expect(toNumber(123.456, 111)).toBe(123.456);
    expect(toNumber(-123.456)).toBe(-123.456);
    expect(toNumber(-123.456, 111)).toBe(-123.456);
  });

  it('should return `string to number` for `toNumber` values', () => {
    expect(toNumber('1')).toBe(1);
    expect(toNumber('1', 111)).toBe(1);
    expect(toNumber('123.456')).toBe(123.456);
    expect(toNumber('123.456', 111)).toBe(123.456);
    expect(toNumber('-123.456')).toBe(-123.456);
    expect(toNumber('-123.456', 111)).toBe(-123.456);
  });
});

describe('toJson', () => {
  it('should return `null or default` for `toJson` values', () => {
    expect(toJson(undefined)).toBeUndefined();
    expect(toJson(undefined, undefined)).toBeUndefined();
    expect(toJson(null)).toBeNull();
    expect(toJson(null, null)).toBeNull();
    expect(toJson(true)).toBeTruthy();
    expect(toJson(true, 111)).toBeTruthy();
    expect(toJson(false)).toBeFalsy();
    expect(toJson(false, 111)).toBeFalsy();
    const date = new Date();
    expect(toJson(date)).toBe(date);
    expect(toJson(date, date)).toBe(date);
    const objectVal = {};
    expect(toJson(objectVal)).toBe(objectVal);
    expect(toJson(objectVal, objectVal)).toBe(objectVal);
    const arrayVal = [1, 2, 3];
    expect(toJson(arrayVal)).toBe(arrayVal);
    expect(toJson(arrayVal, arrayVal)).toBe(arrayVal);
  });

  it('should return `string to number` for `toJson` values', () => {
    expect(toJson('1')).toBe(1);
    expect(toJson('1', 111)).toBe(1);
    expect(toJson('123.456')).toBe(123.456);
    expect(toJson('123.456', 111)).toBe(123.456);
    expect(toJson('-123.456')).toBe(-123.456);
    expect(toJson('-123.456', 111)).toBe(-123.456);
  });

  it('should return `string to null or default` for `toJson` values', () => {
    expect(toJson('')).toBeNull();
    expect(toJson('', 111)).toBe(111);
    expect(toJson('default')).toBeNull();
    expect(toJson('default', 111)).toBe(111);
    // tslint:disable-next-line: no-any
    const a: any = {};
    a.a = a;
  });

  it('should return `string to {}` for `toJson` values', () => {
    expect(toJson('}')).toBeNull();
    expect(toJson('{', 111)).toBe(111);
    expect(toJson('{a: {}', 1)).toBe(1);
  });

  it('should return `string to []` for `toJson` values', () => {
    expect(toJson('[')).toBeNull();
    expect(toJson('[', 111)).toBe(111);
    expect(toJson('[{]', 111)).toBe(111);
  });
});

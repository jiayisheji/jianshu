import { has, isEmpty, isEqual, omit, pick, get } from './check';

describe('isEqual', () => {
  it('should return `true` for `isEqual` values', () => {
    expect(isEqual(1, 1)).toBeTruthy();
    expect(isEqual('', '')).toBeTruthy();
    expect(isEqual(true, true)).toBeTruthy();
    expect(isEqual(false, false)).toBeTruthy();
    expect(isEqual(null, null)).toBeTruthy();
    expect(isEqual(undefined, undefined)).toBeTruthy();
    const dateValue = new Date();
    expect(isEqual(dateValue, dateValue)).toBeTruthy();
    const objectValue = {};
    expect(isEqual(objectValue, objectValue)).toBeTruthy();
    const arrayValue = [];
    expect(isEqual(arrayValue, arrayValue)).toBeTruthy();
    const mapValue = new Map();
    expect(isEqual(mapValue, mapValue)).toBeTruthy();
    const setValue = new Set();
    expect(isEqual(setValue, setValue)).toBeTruthy();
  });

  it('should return `false` for `isEqual` values', () => {
    expect(isEqual(1, 2)).toBeFalsy();
    expect(isEqual('', '1')).toBeFalsy();
    expect(isEqual(1, '1')).toBeFalsy();
    expect(isEqual(true, false)).toBeFalsy();
    expect(isEqual(0, false)).toBeFalsy();
    expect(isEqual(0, null)).toBeFalsy();
    expect(isEqual(0, undefined)).toBeFalsy();
    expect(isEqual(false, null)).toBeFalsy();
    expect(isEqual(false, undefined)).toBeFalsy();
    expect(isEqual(null, undefined)).toBeFalsy();
    expect(isEqual({ a: '1' }, { b: 1 })).toBeFalsy();
    expect(isEqual([1], [2])).toBeFalsy();
    const mapValue1 = new Map();
    mapValue1.set('a', 'a');
    const mapValue2 = new Map();
    mapValue2.set('b', 'b');
    expect(isEqual(mapValue1, mapValue2)).toBeFalsy();
    const setValue1 = new Set();
    setValue1.add(1);
    const setValue2 = new Set();
    setValue2.add(2);
    expect(isEqual(setValue1, setValue2)).toBeFalsy();
  });
});

describe('isEmpty', () => {
  it('should return `true` for `isEmpty` values', () => {
    expect(isEmpty(0)).toBeTruthy();
    expect(isEmpty(1)).toBeTruthy();
    expect(isEmpty(true)).toBeTruthy();
    expect(isEmpty('')).toBeTruthy();
    expect(isEmpty([])).toBeTruthy();
    expect(isEmpty({})).toBeTruthy();
    expect(isEmpty(new Map())).toBeTruthy();
    expect(isEmpty(new Set())).toBeTruthy();
    expect(isEmpty(new Object())).toBeTruthy();
  });

  it('should return `false` for `isEmpty` values', () => {
    expect(isEmpty('123')).toBeFalsy();
    expect(isEmpty([1])).toBeFalsy();
    expect(isEmpty({ a: '1' })).toBeFalsy();
    const mapValue = new Map();
    mapValue.set('a', 'a');
    expect(isEmpty(mapValue)).toBeFalsy();
    const setValue = new Set();
    setValue.add('a');
    expect(isEmpty(setValue)).toBeFalsy();
  });
});

describe('has', () => {
  // tslint:disable-next-line: no-any
  const a: any = {
    foo: {
      foz: [1, 2, 3],
      bar: {
        baz: ['a', 'b', 'c'],
      },
    },
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    empty: null,
  };
  it('should return `true` for `has` values', () => {
    expect(has(a, 'empty')).toBeTruthy();
    expect(has(a, 'field1')).toBeTruthy();
    expect(has(a, 'field4')).toBeTruthy();
    expect(has(a, 'field2')).toBeTruthy();
    expect(has(a, 'foo')).toBeTruthy();
    expect(has(new Date(), 'getDate')).toBeFalsy();
    expect(has(new Object(), 'keys')).toBeFalsy();
    expect(has([], 'length')).toBeFalsy();
  });

  it('should return `false` for `has` values', () => {
    expect(has(a, 'foz')).toBeFalsy();
    expect(has(a, '1')).toBeFalsy();
    expect(has(null, '1')).toBeFalsy();
    expect(has([], '1')).toBeFalsy();
    expect(has(undefined, '1')).toBeFalsy();
    // tslint:disable-next-line: no-any
    expect(has(1 as any, '1')).toBeFalsy();
  });
});

describe('omit', () => {
  // tslint:disable-next-line: no-any
  const a: any = {
    foo: {
      foz: [1, 2, 3],
      bar: {
        baz: ['a', 'b', 'c'],
      },
    },
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    empty: null,
  };
  it('should return `undefined` for `omit` values', () => {
    expect(omit(a, 'empty').empty).toBeUndefined();
    expect(omit(a, ['foo', 'empty', 'field4', 'field3', 'field1', 'field2', 'foo']).empty).toBeUndefined();
  });

  it('should return `value` for `omit` values', () => {
    expect(omit(a, 'empty').field1).toBe(1);
    expect(omit(a, ['empty', 'field4', 'field3', 'field1', 'field2']).foo.foz[0]).toBe(1);
  });
});

describe('pick', () => {
  // tslint:disable-next-line: no-any
  const a: any = {
    foo: {
      foz: [1, 2, 3],
      bar: {
        baz: ['a', 'b', 'c'],
      },
    },
    field1: 1,
    field2: undefined,
    field3: {
      child: 'child',
    },
    field4: [2, 4, 8],
    empty: null,
  };
  it('should return `undefined` for `pick` values', () => {
    // tslint:disable-next-line: no-any
    expect((pick(a, 'field1') as any).empty).toBeUndefined();
    // tslint:disable-next-line: no-any
    expect((pick(a, ['foo', 'field4', 'field3', 'field1', 'field2', 'foo']) as any).empty).toBeUndefined();
  });

  it('should return `value` for `pick` values', () => {
    expect(pick(a, 'empty').empty).toBe(null);
    expect(pick(a, ['empty', 'field4', 'field3', 'field1', 'field2']).field1).toBe(1);
  });
});
describe('get', () => {
  const index = 2;
  const data = {
    foo: {
      foz: [1, 2, 3],
      bar: {
        baz: ['a', 'b', 'c'],
      },
    },
  };
  it('should return data.foo', () => {
    expect(get(data, 'foo')).toEqual(data.foo);
  });
  it('should return 3', () => {
    expect(get(data, ['foo', 'foz', index])).toEqual(3);
  });
  it('should return test', () => {
    const result = 'test';
    // tslint:disable-next-line: no-any
    expect(get<any, string>(data, ['foo', 'bar', 'baz', 8, 'foz'], result)).toEqual(result);
  });
  it('should return null', () => {
    expect(get(data, null)).toEqual(null);
  });
  it('should return null', () => {
    expect(get(data, void 0)).toEqual(null);
  });
});

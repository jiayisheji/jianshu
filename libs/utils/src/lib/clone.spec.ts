import { clone } from './clone';
import { AnyType } from './types';

describe('clone', () => {
  it('should return `{}` values', () => {
    const sym = Symbol('testB');
    const a: AnyType = {

      a(d: AnyType, b: AnyType) {
        console.log(d, b);
      },
      b: 'b',
      c: [1, 2, { a: 1 }],
    };
    a[sym] = 'symbol';
    a.d = a;

    const c = clone(a);
    c.c.push(12);
    expect(a.d).toEqual(a);
    expect(c.d).toEqual(c);
    expect(a.d.c[3]).toBeUndefined();
    expect(c.d.c[3]).toEqual(12);
  });

  it('should return `target` values', () => {
    const map = new Map();
    map.set('key', 'value');
    map.set('Levi', 'code秘密花园');

    const set = new Set();
    set.add('Levi');
    set.add('code秘密花园');

    const target: AnyType = {
      field1: 1,
      field2: undefined,
      field3: {
        child: 'child',
      },
      field4: [2, 4, 8],
      empty: null,
      map,
      set,
      // tslint:disable-next-line: no-construct
      bool: new Boolean(),
      // tslint:disable-next-line: no-construct
      num: new Number(2),
      // tslint:disable-next-line: no-construct
      str: new String(2),
      symbol: Object(Symbol(1)),
      date: new Date(),
      reg: /\d+/,
      error: new Error(),
      func1: () => {
        console.log(this);
        console.log('code秘密花园');
      },

      func2(a: AnyType, b: AnyType) {
        return a + b;
      },
    };

    target.target = target;

    const copy = clone(target);
    expect(copy).toEqual(target);
    expect(copy.num.toFixed).toEqual(target.num.toFixed);
  });

  it('should return `class` values', () => {
    class A {
      public b = 'A';
      constructor(c: string) {
        this.b = c;
      }
      public a() {
        return this.b;
      }
    }

    const B = clone(A);
    const a = new A('this is A');
    const b = new B('this is B');

    expect(a.a).toEqual(b.a);
    expect(a.a()).toEqual('this is A');
    expect(b.a()).toEqual('this is B');
  });
});

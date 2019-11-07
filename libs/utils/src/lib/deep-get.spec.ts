import { deepGet } from "./deep-get";

describe('Utils', () => {

  describe('deepGet', () => {
    const index = 2;
    const data = {
      foo: {
        foz: [1, 2, 3],
        bar: {
          baz: ['a', 'b', 'c']
        }
      }
    };
    it('should return data.foo', () => {
      expect(deepGet(data, 'foo')).toEqual(data.foo);
    });
    it('should return 3', () => {
      expect(deepGet(data, ['foo', 'foz', index])).toEqual(3);
    });
    it('should return test', () => {
      const result = 'test';
      expect(deepGet(data, ['foo', 'bar', 'baz', 8, 'foz'], 'test')).toEqual(result);
    });
    it('should return null', () => {
      expect(deepGet(data, null)).toEqual(null);
    });
    it('should return null', () => {
      expect(deepGet(data, void (0))).toEqual(null);
    });
  });
});

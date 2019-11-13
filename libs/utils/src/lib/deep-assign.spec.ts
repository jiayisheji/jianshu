import { deepAssign } from './deep-assign';

describe('Utils', () => {

  describe('deepClone', () => {
    it('should return null', () => {
      const a = [{ a: 1 }]
      expect(deepAssign({}, a)).toEqual({ "0": { "a": 1 } });
    });
    it('should return null', () => {
      const a = { "a": { "a": 1 } };
      const b = deepAssign({}, a);
      b.a.a = 10;
      expect(a.a.a).toEqual(1);
    });
  });
});

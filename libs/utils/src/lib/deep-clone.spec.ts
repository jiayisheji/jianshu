import { deepClone } from './deep-clone';

describe('Utils', () => {

  describe('deepClone', () => {
    it('should return null', () => {
      expect(deepClone(null)).toEqual(null);
    });
    it('should return void', () => {
      expect(deepClone(void (0))).toBeUndefined();
    });
    it('should return void', () => {
      const a = [];
      const b = deepClone(a);
      b[0] = a;
      expect(a[0]).toBeUndefined();
    });
    it('should return void', () => {
      const a = {};
      expect(deepClone(a)).toEqual(a);
    });
    it('should return 1', () => {
      const a = { "a": { "a": 1 } };
      const b = deepClone(a);
      b.a.a = 10;
      expect(a.a.a).toEqual(1);
    });
  });
});

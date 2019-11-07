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
      const b = deepClone(a) as any;
      b[0] = a;
      expect(a[0]).toBeUndefined();
    });
    it('should return void', () => {
      const a = {};
      expect(deepClone(a)).toEqual(a);
    });
  });
});

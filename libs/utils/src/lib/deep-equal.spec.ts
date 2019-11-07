import { deepEqual } from './deep-equal';

describe('Utils', () => {

  describe('deepEqual', () => {
    it('should return primitive', () => {
      expect(deepEqual(1, 1)).toBeTruthy();
    });
    it('should return null', () => {
      expect(deepEqual(0, null)).toBeFalsy();
    });
    it('should return void', () => {
      expect(deepEqual(null, void (0))).toBeFalsy();
    });
    it('should return date', () => {
      expect(deepEqual(new Date(), new Date())).toBeTruthy();
    });
    it('should return array', () => {
      expect(deepEqual(new Array(), new Array())).toBeTruthy();
    });
    it('should return object', () => {
      expect(deepEqual(new Object(), new Object())).toBeTruthy();
    });
    it('should return [{}]', () => {
      expect(deepEqual({
        a: 1
      }, {
        b: 2,
        a: 1
      })).toBeFalsy();
    });
    it('should return {}', () => {
      expect(deepEqual([{
        a: 1
      }], [{
        b: 2,
        a: 1
      }])).toBeFalsy();
    });
    it('should return {}', () => {
      expect(deepEqual([{
        a: 1
      }], [{
        a: 1
      }])).toBeTruthy();
    });
  });
});

import { toArray, toBoolean, toNumber, toJson } from "./convert";

describe('Utils', () => {

  describe('convert', () => {

    describe('toArray', () => {
      it('should return Array', () => {
        expect(toArray(1)).toEqual([1]);
      });
      it('should return Array', () => {
        expect(toArray([1])).toEqual([1]);
      });
      it('should return Array', () => {
        const fun = () => { };
        expect(toArray(fun)).toEqual([fun]);
      });
      it('should return Array', () => {
        expect(toArray(null)).toEqual([]);
      });
      it('should return Array', () => {
        expect(toArray(void (0))).toEqual([]);
      });
    });

    describe('toBoolean', () => {
      it('should return true', () => {
        expect(toBoolean(1)).toEqual(true);
      });
      it('should return true', () => {
        expect(toBoolean(0)).toEqual(true);
      });
      it('should return false', () => {
        expect(toBoolean(null)).toEqual(false);
      });
      it('should return false', () => {
        expect(toBoolean(void (0))).toEqual(false);
      });
      it('should return true', () => {
        expect(toBoolean('true')).toEqual(true);
      });
      it('should return false', () => {
        expect(toBoolean('false')).toEqual(false);
      });
    });

    describe('toNumber', () => {
      it('should return 1', () => {
        expect(toNumber(1)).toEqual(1);
      });
      it('should return 0', () => {
        expect(toNumber('0')).toEqual(0);
      });
      it('should return 0', () => {
        expect(toNumber(null)).toEqual(0);
      });
      it('should return 0', () => {
        expect(toNumber(void (0))).toEqual(0);
      });
      it('should return 10', () => {
        expect(toNumber('true', 10)).toEqual(10);
      });
      it('should return 20', () => {
        expect(toNumber(NaN, 20)).toEqual(20);
      });
    });

    describe('toJson', () => {
      it('should return 1', () => {
        expect(toJson('1')).toEqual(1);
      });
      it('should return null', () => {
        expect(toJson(null)).toEqual(null);
      });
      it('should return null', () => {
        expect(toJson(void (0))).toEqual(null);
      });
      it('should return true', () => {
        expect(toJson('true', 10)).toEqual(true);
      });
      it('should return null', () => {
        expect(toJson('{')).toEqual(null);
      });
      it('should return {}', () => {
        const result = {};
        expect(toJson('[', result)).toEqual(result);
      });
    });
  });
});

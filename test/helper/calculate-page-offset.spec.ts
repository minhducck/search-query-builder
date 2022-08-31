import {CalculatePageOffset} from "../../src";

describe('Calculate page offset', () => {
  describe('root', () => {
    it('Page offset Test', () => {
      expect(CalculatePageOffset({page: 1, pageSize: 100})).toBe(0);
      expect(CalculatePageOffset({page: 2, pageSize: 100})).toBe(100);
      expect(CalculatePageOffset({page: 2, pageSize: 10})).toBe(10);
      expect(CalculatePageOffset({page: 1, pageSize: 10})).toBe(0);
    });
  });
});

import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';
import {
  getBottomLeftId,
  getBottomRightId,
  getCellId,
  getNextChar,
  getNextNumber,
  getPreviousChar,
  getPreviousNumber,
  getTopLeftId,
} from '@/services/stepsController/utils';

describe('board steps utils', () => {
  describe('getCellId', () => {
    it('getCellId for "a" 3 returns a3', () => {
      expect(getCellId('a', CELL_NUMBER.THREE)).toBe('a3');
    });
    it('getCellId for "h" 8 returns h8', () => {
      expect(getCellId('h', CELL_NUMBER.EIGHT)).toBe('h8');
    });
  });

  describe('getNextChar', () => {
    it('getNextChar for a returns b', () => {
      expect(getNextChar(CELL_CHAR.A)).toBe(CELL_CHAR.B);
    });
    it('getNextChar for h returns null', () => {
      expect(getNextChar(CELL_CHAR.H)).toBeNull();
    });
    it('getNextChar for d returns e', () => {
      expect(getNextChar(CELL_CHAR.D)).toBe(CELL_CHAR.E);
    });
  });

  describe('getPreviousChar', () => {
    it('getPreviousChar for a returns null', () => {
      expect(getPreviousChar(CELL_CHAR.A)).toBeNull();
    });
    it('getPreviousChar for b returns a', () => {
      expect(getPreviousChar(CELL_CHAR.B)).toBe(CELL_CHAR.A);
    });
    it('getPreviousChar for h returns g', () => {
      expect(getPreviousChar(CELL_CHAR.H)).toBe(CELL_CHAR.G);
    });
  });

  describe('getNextNumber', () => {
    it('getNextNumber for 1 returns 2', () => {
      expect(getNextNumber(CELL_NUMBER.ONE)).toBe(CELL_NUMBER.TWO);
    });
    it('getNextNumber for 8 returns null', () => {
      expect(getNextNumber(CELL_NUMBER.EIGHT)).toBeNull();
    });
    it('getNextNumber for 4 returns 5', () => {
      expect(getNextNumber(CELL_NUMBER.FOUR)).toBe(CELL_NUMBER.FIVE);
    });
  });

  describe('getPreviousNumber', () => {
    it('getPreviousNumber for 8 returns 7', () => {
      expect(getPreviousNumber(CELL_NUMBER.EIGHT)).toBe(CELL_NUMBER.SEVEN);
    });
    it('getPreviousNumber for 4 returns 3', () => {
      expect(getPreviousNumber(CELL_NUMBER.FOUR)).toBe(CELL_NUMBER.THREE);
    });
    it('getPreviousNumber for 1 returns null', () => {
      expect(getPreviousNumber(CELL_NUMBER.ONE)).toBeNull();
    });
  });

  describe('getTopLeftId', () => {
    it('getTopLeftId for a1 returns null', () => {
      expect(getTopLeftId('a1')).toBeNull();
    });
    it('getTopLeftId for b2 returns a3', () => {
      expect(getTopLeftId('b2')).toBe('a3');
    });
    it('getTopLeftId for d8 returns null', () => {
      expect(getTopLeftId('d8')).toBeNull();
    });
    it('getTopLeftId for g5 returns f6', () => {
      expect(getTopLeftId('g5')).toBe('f6');
    });
  });

  describe('getBottomRightId', () => {
    it('getBottomRightId for d1 returns null', () => {
      expect(getBottomRightId('d1')).toBeNull();
    });
    it('getBottomRightId for h5 returns null', () => {
      expect(getBottomRightId('h5')).toBeNull();
    });
    it('getBottomRightId for a5 returns b4', () => {
      expect(getBottomRightId('a5')).toBe('b4');
    });
    it('getBottomRightId for d7 returns e6', () => {
      expect(getBottomRightId('d7')).toBe('e6');
    });
  });

  describe('getBottomRightId', () => {
    it('getBottomRightId for d1 returns null', () => {
      expect(getBottomRightId('d1')).toBeNull();
    });
    it('getBottomRightId for h5 returns null', () => {
      expect(getBottomRightId('h5')).toBeNull();
    });
    it('getBottomRightId for a5 returns b4', () => {
      expect(getBottomRightId('a5')).toBe('b4');
    });
    it('getBottomRightId for d7 returns e6', () => {
      expect(getBottomRightId('d7')).toBe('e6');
    });
  });

  describe('getBottomLeftId', () => {
    it('getBottomLeftId for g1 returns null', () => {
      expect(getBottomLeftId('g1')).toBeNull();
    });
    it('getBottomLeftId for a8 returns null', () => {
      expect(getBottomLeftId('a8')).toBeNull();
    });
    it('getBottomLeftId for d5 returns c4', () => {
      expect(getBottomLeftId('d5')).toBe('c4');
    });
    it('getBottomLeftId for g2 returns f1', () => {
      expect(getBottomLeftId('g2')).toBe('f1');
    });
  });
});

import { CELL_CHAR } from '@/constants';
import { CharValueType, NumberValueType } from '@/types';
import {
  getBottomLeftId,
  getBottomRightId,
  getCellId,
  getNextChar,
  getNextNumber,
  getPreviousChar,
  getPreviousNumber,
  getTopLeftId,
  getTopRightId,
} from '@/utils';

interface IBoardStepsUtils {
  getCellId: (char: CharValueType, number: NumberValueType) => string;
  getNextChar: (char: CharValueType) => CharValueType | null;
  getPreviousChar: (char: CharValueType) => CharValueType | null;
  getNextNumber: (number: NumberValueType) => NumberValueType | null;
  getPreviousNumber: (number: NumberValueType) => NumberValueType | null;
  getTopRightId: (id: string) => string | null;
  getTopLeftId: (id: string) => string | null;
  getBottomRightId: (id: string) => string | null;
  getBottomLeftId: (id: string) => string | null;
}

const utils: IBoardStepsUtils = {
  getCellId,
  getNextChar,
  getPreviousChar,
  getNextNumber,
  getPreviousNumber,
  getTopRightId,
  getTopLeftId,
  getBottomRightId,
  getBottomLeftId,
};

describe('board steps utils', () => {
  describe('getCellId', () => {
    it('getCellId for "a" 3 returns a3', () => {
      expect(utils.getCellId('a', 3)).toBe('a3');
    });
    it('getCellId for "h" 8 returns h8', () => {
      expect(utils.getCellId('h', 8)).toBe('h8');
    });
  });

  describe('getNextChar', () => {
    it('getNextChar for a returns b', () => {
      expect(utils.getNextChar(CELL_CHAR.A)).toBe(CELL_CHAR.B);
    });
    it('getNextChar for h returns null', () => {
      expect(utils.getNextChar(CELL_CHAR.H)).toBeNull();
    });
    it('getNextChar for d returns e', () => {
      expect(utils.getNextChar(CELL_CHAR.D)).toBe(CELL_CHAR.E);
    });
  });

  describe('getPreviousChar', () => {
    it('getPreviousChar for a returns null', () => {
      expect(utils.getPreviousChar(CELL_CHAR.A)).toBeNull();
    });
    it('getPreviousChar for b returns a', () => {
      expect(utils.getPreviousChar(CELL_CHAR.B)).toBe(CELL_CHAR.A);
    });
    it('getPreviousChar for h returns g', () => {
      expect(utils.getPreviousChar(CELL_CHAR.H)).toBe(CELL_CHAR.G);
    });
  });

  describe('getNextNumber', () => {
    it('getNextNumber for 1 returns 2', () => {
      expect(utils.getNextNumber(1)).toBe(2);
    });
    it('getNextNumber for 8 returns null', () => {
      expect(utils.getNextNumber(8)).toBeNull();
    });
    it('getNextNumber for 4 returns 5', () => {
      expect(utils.getNextNumber(4)).toBe(5);
    });
  });

  describe('getPreviousNumber', () => {
    it('getPreviousNumber for 8 returns 7', () => {
      expect(utils.getPreviousNumber(8)).toBe(7);
    });
    it('getPreviousNumber for 4 returns 3', () => {
      expect(utils.getPreviousNumber(4)).toBe(3);
    });
    it('getPreviousNumber for 1 returns null', () => {
      expect(utils.getPreviousNumber(1)).toBeNull();
    });
  });

  describe('getTopLeftId', () => {
    it('getTopLeftId for a1 returns null', () => {
      expect(utils.getTopLeftId('a1')).toBeNull();
    });
    it('getTopLeftId for b2 returns a3', () => {
      expect(utils.getTopLeftId('b2')).toBe('a3');
    });
    it('getTopLeftId for d8 returns null', () => {
      expect(utils.getTopLeftId('8d')).toBeNull();
    });
    it('getTopLeftId for g5 returns f6', () => {
      expect(utils.getTopLeftId('g5')).toBe('f6');
    });
  });

  describe('getBottomRightId', () => {
    it('getBottomRightId for d1 returns null', () => {
      expect(utils.getBottomRightId('d1')).toBeNull();
    });
    it('getBottomRightId for h5 returns null', () => {
      expect(utils.getBottomRightId('h5')).toBeNull();
    });
    it('getBottomRightId for a5 returns b4', () => {
      expect(utils.getBottomRightId('a5')).toBe('b4');
    });
    it('getBottomRightId for d7 returns e6', () => {
      expect(utils.getBottomRightId('d7')).toBe('e6');
    });
  });

  describe('getBottomRightId', () => {
    it('getBottomRightId for d1 returns null', () => {
      expect(utils.getBottomRightId('d1')).toBeNull();
    });
    it('getBottomRightId for h5 returns null', () => {
      expect(utils.getBottomRightId('h5')).toBeNull();
    });
    it('getBottomRightId for a5 returns b4', () => {
      expect(utils.getBottomRightId('a5')).toBe('b4');
    });
    it('getBottomRightId for d7 returns e6', () => {
      expect(utils.getBottomRightId('d7')).toBe('e6');
    });
  });

  describe('getBottomLeftId', () => {
    it('getBottomLeftId for g1 returns null', () => {
      expect(utils.getBottomLeftId('g1')).toBeNull();
    });
    it('getBottomLeftId for a8 returns null', () => {
      expect(utils.getBottomLeftId('a8')).toBeNull();
    });
    it('getBottomLeftId for d5 returns c4', () => {
      expect(utils.getBottomLeftId('d5')).toBe('c4');
    });
    it('getBottomLeftId for g2 returns f1', () => {
      expect(utils.getBottomLeftId('g2')).toBe('f1');
    });
  });
});

import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';
import { CellIdType, CharValueType, NumberValueType } from '@/entities/Cell/types';

export function getCellId(char: CharValueType, number: NumberValueType): CellIdType {
  return `${char}${number}`;
}

export const parseCellId = (id: CellIdType) => ({
  char: id[0] as CharValueType,
  number: id[1] as NumberValueType,
});

export function getNextChar(char: CharValueType): CharValueType | null {
  if (char === CELL_CHAR.H) return null;
  return String.fromCharCode(char.charCodeAt(0) + 1) as CharValueType;
}

export function getPreviousChar(char: CharValueType): CharValueType | null {
  if (char === CELL_CHAR.A) return null;
  return String.fromCharCode(char.charCodeAt(0) - 1) as CharValueType;
}

export function getNextNumber(number: NumberValueType): NumberValueType | null {
  if (number === CELL_NUMBER.EIGHT) return null;
  return String(+number + 1) as NumberValueType;
}

export function getPreviousNumber(number: NumberValueType): NumberValueType | null {
  if (number === CELL_NUMBER.ONE) return null;
  return String(+number - 1) as NumberValueType;
}

export function getForwardId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const nextNumber = getNextNumber(number);

  if (!nextNumber) return null;
  return getCellId(char, nextNumber);
}

export function getBackwardId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const previousNumber = getPreviousNumber(number);

  if (!previousNumber) return null;
  return getCellId(char, previousNumber);
}

export function getLeftId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const previousChar = getPreviousChar(char);

  if (!previousChar) return null;
  return getCellId(previousChar, number);
}

export function getRightId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const nextChar = getNextChar(char);

  if (!nextChar) return null;
  return getCellId(nextChar, number);
}

export function getTopRightId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const nextChar = getNextChar(char);
  const nextNumber = getNextNumber(number);

  if (!nextChar || !nextNumber) return null;
  return getCellId(nextChar, nextNumber);
}

export function getTopLeftId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const previousChar = getPreviousChar(char);
  const nextNumber = getNextNumber(number);

  if (!previousChar || !nextNumber) return null;
  return getCellId(previousChar, nextNumber);
}

export function getBottomRightId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const nextChar = getNextChar(char);
  const previousNumber = getPreviousNumber(number);

  if (!nextChar || !previousNumber) return null;
  return getCellId(nextChar, previousNumber);
}

export function getBottomLeftId(id: CellIdType | null): CellIdType | null {
  if (!id) return null;
  const char = id[0] as CharValueType;
  const number = id[1] as NumberValueType;
  const previousChar = getPreviousChar(char);
  const previousNumber = getPreviousNumber(number);

  if (!previousChar || !previousNumber) return null;
  return getCellId(previousChar, previousNumber);
}

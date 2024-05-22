import { CELL_CHAR, CELL_NUMBER } from '@/constants';
import { CharValueType, NumberValueType } from '@/types';

export function getCellId(char: CharValueType, number: NumberValueType): string {
  return `${char}${number}`;
}

export function uniqId(prefix = '', random = false) {
  const sec = Date.now() * 1000 + Math.random() * 1000;
  const id = sec.toString(16).replace(/\./g, '').padEnd(14, '0');
  return `${prefix}${id}${random ? `.${Math.trunc(Math.random() * 100000000)}` : ''}`;
}

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
  return (number + 1) as NumberValueType;
}

export function getPreviousNumber(number: NumberValueType): NumberValueType | null {
  if (number === CELL_NUMBER.ONE) return null;
  return (number - 1) as NumberValueType;
}

export function getTopRightId(id: string): string | null {
  const char = id[0] as CharValueType;
  const number = Number(id[1]) as NumberValueType;
  const nextChar = getNextChar(char);
  const nextNumber = getNextNumber(number);

  if (!nextChar || !nextNumber) return null;
  return getCellId(nextChar, nextNumber);
}

export function getTopLeftId(id: string): string | null {
  const char = id[0] as CharValueType;
  const number = Number(id[1]) as NumberValueType;
  const previousChar = getPreviousChar(char);
  const nextNumber = getNextNumber(number);

  if (!previousChar || !nextNumber) return null;
  return getCellId(previousChar, nextNumber);
}

export function getBottomRightId(id: string): string | null {
  const char = id[0] as CharValueType;
  const number = Number(id[1]) as NumberValueType;
  const nextChar = getNextChar(char);
  const previousNumber = getPreviousNumber(number);

  if (!nextChar || !previousNumber) return null;
  return getCellId(nextChar, previousNumber);
}

export function getBottomLeftId(id: string): string | null {
  const char = id[0] as CharValueType;
  const number = Number(id[1]) as NumberValueType;
  const previousChar = getPreviousChar(char);
  const previousNumber = getPreviousNumber(number);

  if (!previousChar || !previousNumber) return null;
  return getCellId(previousChar, previousNumber);
}

export const CELLS_COUNT_IN_ROW = 8;

export const CELL_CHAR = {
  A: 'a',
  B: 'b',
  C: 'c',
  D: 'd',
  E: 'e',
  F: 'f',
  G: 'g',
  H: 'h',
} as const;

export const CELL_NUMBER = {
  ONE: '1',
  TWO: '2',
  THREE: '3',
  FOUR: '4',
  FIVE: '5',
  SIX: '6',
  SEVEN: '7',
  EIGHT: '8',
} as const;

export const cellCharsList = Object.values(CELL_CHAR);
export const cellNumbersReversedList = Object.values(CELL_NUMBER).reverse();

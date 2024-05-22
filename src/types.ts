import { CELL_CHAR, CELL_NUMBER } from './constants';

export type CharValueType = (typeof CELL_CHAR)[keyof typeof CELL_CHAR];
export type NumberValueType = (typeof CELL_NUMBER)[keyof typeof CELL_NUMBER];

export type noneFn = () => void;

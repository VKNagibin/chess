import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';

export type CharValueType = (typeof CELL_CHAR)[keyof typeof CELL_CHAR];
export type NumberValueType = (typeof CELL_NUMBER)[keyof typeof CELL_NUMBER];

export type CellIdType = `${CharValueType}${NumberValueType}`;

export type noneFn = () => void;

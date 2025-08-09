import { ICellAsPlainObject } from '@/entities/Cell/types';

const getEnPassantFEN = (cells: ICellAsPlainObject[]) => {
  let result = '-';

  cells.forEach((cell) => {
    if (cell.enPassantCellId) result = cell.enPassantCellId;
  });

  return result;
};

export default getEnPassantFEN;

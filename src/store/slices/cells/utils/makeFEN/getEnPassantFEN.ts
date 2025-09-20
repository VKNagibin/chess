import { ICell } from '@/entities/Cell/types';

const getEnPassantFEN = (cells: ICell[]) => {
  let result = '-';

  cells.forEach((cell) => {
    if (cell.enPassantCellId) result = cell.enPassantCellId;
  });

  return result;
};

export default getEnPassantFEN;

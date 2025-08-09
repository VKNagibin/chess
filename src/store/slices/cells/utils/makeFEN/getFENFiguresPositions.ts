import {
  cellCharsBoundaryValues,
  cellNumbersBoundaryValues,
} from '@/entities/Cell/constants';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import { parseCellId } from '@/services/stepsController/utils';
import { getFENFigureNotation } from '@/store/slices/cells/utils/makeFEN/getFENFigureNotation';

export const getFENFiguresPositions = (cells: ICellAsPlainObject[]) => {
  let result = '';
  let emptyHorizontalCellsCount = 0;

  cells.map((cell) => {
    const { char, number } = parseCellId(cell.id);
    const isLastChar = cellCharsBoundaryValues[1] === char;
    const isLastNumber = cellNumbersBoundaryValues[0] === number;
    const figure = cell.hiddenFigure ? null : cell.figure;

    if (isLastNumber && isLastChar && figure) {
      result += `${emptyHorizontalCellsCount || ''}${getFENFigureNotation(figure)}`;
      return;
    }

    if (isLastNumber && isLastChar) {
      result += `${++emptyHorizontalCellsCount}`;
      return;
    }

    if (isLastChar && figure) {
      result += `${emptyHorizontalCellsCount || ''}${getFENFigureNotation(figure)}/`;
      emptyHorizontalCellsCount = 0;
      return;
    }
    if (isLastChar) {
      result += `${++emptyHorizontalCellsCount}/`;
      emptyHorizontalCellsCount = 0;
      return;
    }
    if (figure) {
      result += `${emptyHorizontalCellsCount || ''}${getFENFigureNotation(figure)}`;
      emptyHorizontalCellsCount = 0;
      return;
    }
    emptyHorizontalCellsCount++;
  });

  return result;
};

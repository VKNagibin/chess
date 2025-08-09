import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { RectangularCoordinatesType } from '@/shared/types';
import { checkIsStep } from '@/store/slices/cells/utils/helpers';

export const getHoverClass = (cell: ICellAsPlainObject) => {
  if (checkIsStep(cell.highlight)) return ' filled';
  if (cell.highlight === HighlightType.TEAM) return ' currentTeam';
  return '';
};

export const getCellCoordinates = (
  cellElement: HTMLButtonElement,
): RectangularCoordinatesType => {
  const {
    height = 0,
    left = 0,
    width = 0,
    top = 0,
  } = cellElement.getBoundingClientRect();

  return {
    x: parseInt(String(left - width / 2)),
    y: parseInt(String(top - height / 2)),
  };
};

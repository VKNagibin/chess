import classes from '@/components/Cell/Cell.module.scss';
import { HighlightType } from '@/entities/Cell/enums';
import type { ICell } from '@/entities/Cell/types';
import { RectangularCoordinatesType } from '@/shared/types';
import { checkIsStep } from '@/store/slices/cells/utils/helpers';

export const getHoverClass = (cell: ICell) => {
  if (checkIsStep(cell.highlight)) return ' filled';
  if (cell.highlight === HighlightType.TEAM) return ' activeTeam';
  return '';
};

export const getBorderClass = (cell: ICell) => {
  if (cell.id === 'a8') return classes.borderLeftTop;
  if (cell.id === 'h8') return classes.borderRightTop;
  if (cell.id === 'a1') return classes.borderLeftBottom;
  if (cell.id === 'h1') return classes.borderRightBottom;

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

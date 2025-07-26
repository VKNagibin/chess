import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import handlersByFigureTypeMap from '@/services/stepsController';
import { StepDataInterface } from '@/store/slices/cells/types';

const stepTypeHighlightList = [
  HighlightType.KILL_STEP,
  HighlightType.DEFAULT_STEP,
  HighlightType.CASTLING_STEP,
];

export const checkIsStep = (highlightType: HighlightType) =>
  stepTypeHighlightList.includes(highlightType);

export const checkIsKing = (cell: ICellAsPlainObject) =>
  cell.figure?.type === FigureType.KING;

export const findFocusedCell = (cells: ICellAsPlainObject[]) =>
  cells.find((cell) => cell.highlight === HighlightType.SELECTED);

export const clearCastling = (cells: ICellAsPlainObject[]) => {
  cells.forEach((cell) => {
    cell.castling = [];
  });
};

export const getKing = (cells: ICellAsPlainObject[], team: FigureTeam) => {
  return cells.find((cell) => cell.figure?.team === team && checkIsKing(cell));
};

export function getSteps({
  cells,
  currentCell,
  ignoreCastling = false,
}: StepDataInterface) {
  if (!currentCell.figure) return [];
  const handler = handlersByFigureTypeMap[currentCell.figure.type];
  return handler({ cells, currentCell, ignoreCastling });
}

export const resetCellsHighlight = (cells: ICellAsPlainObject[]) => {
  cells.forEach((cell) => {
    if (cell.highlight !== HighlightType.NONE) cell.highlight = HighlightType.NONE;
  });
};
export const getEnemyTeam = (team: FigureTeam) =>
  team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK;

import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { StepDataInterface } from '@/redux/slices/cells/types';
import handlersByFigureTypeMap from '@/stepsController';

const stepTypeHighlightList = [
  HighlightType.KILL_STEP,
  HighlightType.DEFAULT_STEP,
  HighlightType.CASTLING_STEP,
];

export const checkIsStep = (highlightType: HighlightType) =>
  stepTypeHighlightList.includes(highlightType);

export const checkIsKing = (cell: ICellAsPlainObject) =>
  cell.figure?.type === FigureType.KING;

export const getEnemyTeam = (team: FigureTeam) =>
  team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK;

export const findById = (list: { id: string }[], id: string) =>
  list.find((item) => item.id === id);

export const findFocusedCell = (cells: ICellAsPlainObject[]) =>
  cells.find((cell) => cell.highlight === HighlightType.SELECTED);

export function checkIsTimeToChangeStepTeam(
  cells: ICellAsPlainObject[],
  cellId: CellIdType,
  currentStepTeam: FigureTeam,
) {
  const selectedCell = findById(cells, cellId) as ICellAsPlainObject;
  const isTryToSelectEnemiesTeamFigure = selectedCell.figure?.team !== currentStepTeam;
  if (isTryToSelectEnemiesTeamFigure) return false;

  return !!selectedCell.figure && selectedCell.highlight !== HighlightType.SELECTED;
}

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

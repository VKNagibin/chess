import { createEvent, createStore, sample } from 'effector';

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/stores/cell/types';
import {
  arrangeCells,
  changeTeamFilter,
  checkIsStep,
  findById,
  findFocusedCell,
  getSteps,
  handleFigureSelect,
  handleStep,
  resetCellsHighlight,
} from '@/stores/cell/utils';

export const stepTypeHighlightList = [
  HighlightType.KILL_STEP,
  HighlightType.DEFAULT_STEP,
];

export const onCellFocus = createEvent<{
  cellId: CellIdType;
  currentStepTeam: FigureTeam;
}>();

export const changeTeam = createEvent();
export const onGameOver = createEvent();
export const $currentStepTeam = createStore<FigureTeam>(FigureTeam.WHITE);
export const $cells = createStore<Cell[]>(arrangeCells());

$currentStepTeam.on(changeTeam, (currentStepTeam) =>
  currentStepTeam === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK,
);

sample({
  clock: onCellFocus,
  source: $cells,
  filter: (cells, { cellId, currentStepTeam }) =>
    changeTeamFilter(cells, cellId, currentStepTeam),
  target: changeTeam,
});

$currentStepTeam.on(onGameOver, () => FigureTeam.WHITE);
$cells.on(onGameOver, () => arrangeCells());

$cells.on(onCellFocus, (cells, { cellId, currentStepTeam }): Cell[] => {
  const cellAlreadyFocused = findFocusedCell(cells)?.id === cellId;
  if (cellAlreadyFocused) return cells;

  const currentCell = findById(cells, cellId) as Cell;
  const isStep = checkIsStep(currentCell.highlight);
  const isIllegalFocus = currentCell.figure?.team !== currentStepTeam;
  const cellsWithoutHighlights = resetCellsHighlight(cells);

  if (!isStep && isIllegalFocus) return cellsWithoutHighlights;
  if (isStep) return handleStep(currentCell, cells);

  const steps: IStep[] = getSteps(cellsWithoutHighlights, currentCell);

  return handleFigureSelect(cellsWithoutHighlights, cellId, steps);
});

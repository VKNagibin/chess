import { createEvent, createStore, sample } from 'effector';

import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/stores/cell/types';
import arrangeCells from '@/stores/cell/utils/arrangeCells';
import handleFigureSelect from '@/stores/cell/utils/handleFigureSelect';
import { handleStep } from '@/stores/cell/utils/handleStep';
import {
  changeTeamFilter,
  checkIsStep,
  findById,
  findFocusedCell,
  getSteps,
  resetCellsHighlight,
} from '@/stores/cell/utils/helpers';
import { changeTeam, onGameOver } from '@/stores/events';

export const onCellFocus = createEvent<{
  cellId: CellIdType;
  currentStepTeam: FigureTeam;
}>();

export const $cells = createStore<Cell[]>(arrangeCells());

sample({
  clock: onCellFocus,
  source: $cells,
  filter: (cells, { cellId, currentStepTeam }) =>
    changeTeamFilter(cells, cellId, currentStepTeam),
  target: changeTeam,
});

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

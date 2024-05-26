import { createEvent, createStore, sample } from 'effector';

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import handlersByFigureTypeMap from '@/stepsController/index';
import { IStep } from '@/stores/cell/types';
import {
  arrangeCells,
  checkIsStep,
  findById,
  findFocusedCell,
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

export const $currentStepTeam = createStore<FigureTeam>(FigureTeam.WHITE);
export const $cells = createStore<Cell[]>(arrangeCells());

// sample({
//   clock: onCellFocus /* 1 */
//   source: $userName /* 2 */,
//   fn: (name, password) => ({ name, password }) /* 3 */,
//   target: signIn /* 4 */,
// });

// 1. при вызове submitForm с аргументом 12345678
// 2. прочитать значение из стора $userName ('john')
// 3. преобразовать значение из submitForm (1) и $userName (2)
// 4. и передать результат вычислений в эффект signIn

function getSteps(cells: Cell[], focusedCell: Cell) {
  if (!focusedCell.figure) return [];
  const handler = handlersByFigureTypeMap[focusedCell.figure.type];
  return handler(cells, focusedCell);
}

$currentStepTeam.on(changeTeam, (currentStepTeam) => {
  console.log('hereeee!!!!');

  if (currentStepTeam === FigureTeam.BLACK) return FigureTeam.WHITE;
  return FigureTeam.BLACK;
});

sample({
  clock: onCellFocus,
  source: $cells,
  filter: (cells, { cellId }) => {
    const currentCell = findById(cells, cellId) as Cell;
    console.log(
      ' checkIsStep(currentCell.highlight)',
      checkIsStep(currentCell.highlight),
    );

    return checkIsStep(currentCell.highlight);
  },
  target: changeTeam,
});

$cells.on(onCellFocus, (cells, { cellId, currentStepTeam }): Cell[] => {
  const currentCell = findById(cells, cellId) as Cell;
  const previousSelectedCell = cells.find(
    (cell) => cell.highlight === HighlightType.SELECTED,
  );
  const isStep = checkIsStep(currentCell.highlight);

  // if (previousSelectedCell && !isStep) return cells;
  // if (previousSelectedCell && previousSelectedCell.figure?.team !== currentStepTeam)
  //   return cells;

  // if (
  //   !previousSelectedCell &&
  //   currentCell.figure &&
  //   currentCell.figure.team !== currentStepTeam
  // )
  //   return cells;

  const isUselessField = !currentCell.figure && !previousSelectedCell?.figure;
  if (isUselessField) return cells;
  if (findFocusedCell(cells)?.id === cellId) return cells;

  const cellsWithoutHighlights = cells.map((cell) => {
    if (cell.highlight === HighlightType.NONE) return cell;
    return {
      ...cell,
      highlight: HighlightType.NONE,
    };
  });

  if (isStep) {
    previousSelectedCell!.figure!.isFirstStep = false;
    return cellsWithoutHighlights.map((cell) => {
      if (cell.id === currentCell.id)
        return { ...cell, figure: previousSelectedCell!.figure };
      if (cell.id === previousSelectedCell!.id) return { ...cell, figure: null };
      return cell;
    });
  }

  const steps: IStep[] = getSteps(cellsWithoutHighlights, currentCell);

  return cellsWithoutHighlights.map((cell) => {
    if (cell.id === cellId) return { ...cell, highlight: HighlightType.SELECTED };
    const currentStep = steps.find((step) => step.cellId === cell.id);
    if (currentStep)
      return { ...cell, highlight: currentStep.highlight as HighlightType };
    return cell;
  });
});

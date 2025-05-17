import { createEvent, createStore, sample } from 'effector';

import Cell from '@/entities/Cell/Cell';
import { CELL_NUMBER } from '@/entities/Cell/constants';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import Figure from '@/entities/Figure';
import { ICellFocusHandler, ISelectedFigureForMutate, IStep } from '@/stores/cell/types';
import arrangeCells from '@/stores/cell/utils/arrangeCells';
import handleFigureSelect from '@/stores/cell/utils/handleFigureSelect';
import { handleStep } from '@/stores/cell/utils/handleStep';
import {
  checkIsStep,
  checkIsTimeToChangeStepTeam,
  findById,
  findFocusedCell,
  getSteps,
  resetCellsHighlight,
} from '@/stores/cell/utils/helpers';
import { changeTeam, onGameOver } from '@/stores/events';
import { onStartPawnMutate } from '@/stores/pawnMutateModal';

export const onCellFocus = createEvent<ICellFocusHandler>();
export const onSelectFigureForMutate = createEvent<ISelectedFigureForMutate>();

export const $cells = createStore<Cell[]>(arrangeCells());

sample({
  clock: onCellFocus,
  source: $cells,
  filter: (cells, { cellId, currentStepTeam }) =>
    checkIsTimeToChangeStepTeam(cells, cellId, currentStepTeam),
  target: changeTeam,
});

sample({
  clock: onCellFocus,
  source: $cells,
  filter: (cells) => !!cells.find((cell) => checkPawnReadyForMutate(cell)),
  fn: (cells) => {
    const cell = cells.find((cell) => checkPawnReadyForMutate(cell))!;
    return {
      cellId: cell.id,
      team: cell.figure!.team,
    };
  },
  target: onStartPawnMutate,
});

const teamConstraintRowMap = {
  [FigureTeam.WHITE]: CELL_NUMBER.EIGHT,
  [FigureTeam.BLACK]: CELL_NUMBER.ONE,
};

const checkPawnReadyForMutate = (cell: Cell) => {
  const figure = cell.figure;
  if (!figure) return false;
  if (figure.type !== FigureType.PAWN) return false;
  if (figure.isMutatedPawn) return false;
  return teamConstraintRowMap[figure.team] === cell.id[1];
};

$cells.on(onGameOver, () => arrangeCells());

$cells.on(onSelectFigureForMutate, (cells, { cellId, type }) => {
  const currentCell = findById(cells, cellId) as Cell;
  const team = currentCell.figure!.team;
  return cells.map((cell) => {
    if (cell.id === currentCell.id) return { ...cell, figure: new Figure(type, team) };
    return cell;
  });
});

$cells.on(onCellFocus, (cells, { cellId, currentStepTeam }): Cell[] => {
  const cellsClearedFromLastIteration = cells.map((cell) => {
    if (!cell.animationConfig) return cell;
    return {
      ...cell,
      animationConfig: null,
    };
  });

  const cellAlreadyFocused =
    findFocusedCell(cellsClearedFromLastIteration)?.id === cellId;
  if (cellAlreadyFocused) return cellsClearedFromLastIteration;

  const currentCell = findById(cellsClearedFromLastIteration, cellId) as Cell;
  const isStep = checkIsStep(currentCell.highlight);
  const isIllegalFocus = currentCell.figure?.team !== currentStepTeam;
  const cellsWithoutHighlights = resetCellsHighlight(cellsClearedFromLastIteration);

  if (!isStep && isIllegalFocus) return cellsWithoutHighlights;
  if (isStep) return handleStep(currentCell, cellsClearedFromLastIteration);

  const steps: IStep[] = getSteps(cellsWithoutHighlights, currentCell);

  return handleFigureSelect(cellsWithoutHighlights, cellId, steps);
});

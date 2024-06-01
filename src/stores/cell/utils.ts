import Cell from '@/entities/Cell/Cell';
import {
  cellCharsList,
  cellNumbersReversedList,
  CELLS_COUNT_IN_ROW,
} from '@/entities/Cell/constants';
import { CellColor, FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import { CellIdType, CharValueType, NumberValueType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';
import handlersByFigureTypeMap from '@/stepsController';
import { stepTypeHighlightList } from '@/stores/cell';
import { teamsConfigs } from '@/stores/cell/placesConfig';
import { getCellId } from '@/utils';

import { IStep } from './types';

interface IBoardState {
  cells: Cell[];
  currentFigure: Figure;
}

export function arrangeCells(): Cell[] {
  const cellsList = new Array(64).fill(undefined);

  const cells = cellsList.map((_, index) => {
    const currentRowNumber = parseInt(String(index / CELLS_COUNT_IN_ROW));
    const currentColumnNumber = index - CELLS_COUNT_IN_ROW * currentRowNumber;
    const cellNumber = cellNumbersReversedList[
      currentRowNumber
    ] as unknown as NumberValueType;
    const cellChar = cellCharsList[currentColumnNumber] as CharValueType;
    const isEvenRow = Boolean(currentRowNumber % 2);
    const isEvenCell = index % 2 === 0;
    const cellId = getCellId(cellChar, cellNumber);

    if (!isEvenRow && isEvenCell) return new Cell(cellId, CellColor.BLACK);
    if (isEvenRow && !isEvenCell) return new Cell(cellId, CellColor.BLACK);
    return new Cell(cellId, CellColor.WHITE);
  });

  arrangeFiguresIntoCells(cells);
  return cells;
}

export function arrangeFiguresIntoCells(cells: Cell[]) {
  const teamsNames = Object.keys(teamsConfigs) as FigureTeam[];
  teamsNames.forEach((teamName) => {
    const teamConfigs = teamsConfigs[teamName];
    teamConfigs.forEach((figureConfigs) => {
      const targetCellsList = figureConfigs.cellsIds.map(
        (cellId) => cells.find((cell) => cell.id === cellId)!,
      );
      targetCellsList.forEach(
        (cell) => (cell.figure = new Figure(figureConfigs.figure, teamName)),
      );
    });
  });
}

export const findById = (list: { id: string }[], id: string) =>
  list.find((item) => item.id === id);

export const checkIsStep = (highlightType: HighlightType): boolean =>
  stepTypeHighlightList.includes(highlightType);

export const findFocusedCell = (cells: Cell[]) =>
  cells.find((cell) => cell.highlight === HighlightType.SELECTED);

function removeFigure(cell: Cell): Cell {
  return {
    ...cell,
    hiddenFigure: false,
    figure: null,
  };
}

function handlePawnStep(stepOwner: Cell, currentCell: Cell, cells: Cell[]) {
  const cellsWithoutHighlight = resetCellsHighlight(cells);
  if (!currentCell.hiddenFigure)
    return cellsWithoutHighlight.map((cell) => {
      if (currentCell.enPassantCellId === cell.id) {
        return { ...cell, figure: stepOwner.figure, hiddenFigure: true };
      }
      if (cell.hiddenFigure) return removeFigure(cell);

      if (cell.id === currentCell.id)
        return {
          ...cell,
          figure: stepOwner.figure,
        };
      if (cell.id === stepOwner.id) return { ...cell, figure: null };
      return cell;
    });

  const sourceCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  return cellsWithoutHighlight.map((cell) => {
    if (cell.id === sourceCell?.id) return { ...cell, figure: null };
    if (cell.id === currentCell.id)
      return { ...cell, figure: stepOwner.figure, hiddenFigure: false };
    if (stepOwner.id === cell.id)
      return {
        ...cell,
        figure: null,
      };
    return cell;
  });
}

export function changeTeamFilter(
  cells: Cell[],
  cellId: CellIdType,
  currentStepTeam: FigureTeam,
) {
  const currentCell = findById(cells, cellId) as Cell;
  const isIllegalFocus = currentCell.figure?.team !== currentStepTeam;
  if (isIllegalFocus) return false;

  return !!currentCell.figure && currentCell.highlight !== HighlightType.SELECTED;
}

export function getSteps(cells: Cell[], focusedCell: Cell) {
  if (!focusedCell.figure) return [];
  const handler = handlersByFigureTypeMap[focusedCell.figure.type];
  return handler(cells, focusedCell);
}

export function getAfterStepBoardState(
  currentCell: Cell,
  cells: Cell[],
  stepOwner?: Cell,
): IBoardState {
  const stepOwnerCell =
    stepOwner || cells.find((cell) => cell.highlight === HighlightType.SELECTED)!;
  if (!stepOwnerCell) throw new Error('Ups...Something went wrong...');
  const currentFigure = stepOwnerCell.figure!;
  const stepsWithoutHighlight = resetCellsHighlight(cells);

  let afterStepCellsState: Cell[] = [];

  if (currentFigure.type === FigureType.PAWN)
    afterStepCellsState = handlePawnStep(stepOwnerCell, currentCell, cells);
  else
    afterStepCellsState = stepsWithoutHighlight.map((cell) => {
      if (cell.id === currentCell.id) return { ...cell, figure: currentFigure };
      if (cell.id === stepOwnerCell!.id) return { ...cell, figure: null };
      return cell;
    });

  return { cells: afterStepCellsState, currentFigure };
}

export function handleStep(currentCell: Cell, cells: Cell[]): Cell[] {
  const { cells: preparedCells, currentFigure } = getAfterStepBoardState(
    currentCell,
    cells,
  );
  const ourKingEnemies = getKingEnemies(preparedCells, currentFigure.team);
  const theirKingEnemies = getKingEnemies(
    preparedCells,
    currentFigure.team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK,
  );

  if (ourKingEnemies.length) {
    if (saveStepsExist(preparedCells, currentFigure.team))
      return resetCellsHighlight(cells);
    return preparedCells.map((cell) => {
      if (currentCell.id === cell.id)
        return {
          ...cell,
          isOver: true,
        };
      return cell;
    });
  }

  if (theirKingEnemies.length) {
    if (
      saveStepsExist(
        preparedCells,
        currentFigure.team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK,
      )
    )
      return resetCellsHighlight(cells);
    return preparedCells.map((cell) => {
      if (currentCell.id === cell.id)
        return {
          ...cell,
          isOver: true,
        };
      return cell;
    });
  }

  currentFigure.isFirstStep = false;

  return preparedCells;
}

export function saveStepsExist(cells: Cell[], currentTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const currentTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === currentTeam,
  );

  for (let cellIndex = 0; cellIndex < currentTeamCells.length; cellIndex++) {
    const cellSteps = getSteps(cells, currentTeamCells[cellIndex]);
    for (let stepIndex = 0; stepIndex < cellSteps.length; stepIndex++) {
      const testCurrentCell = cells.find(
        (cell) => cell.id === cellSteps[stepIndex].cellId,
      )!;
      const { cells: testAfterStepCells, currentFigure } = getAfterStepBoardState(
        testCurrentCell,
        cells,
        currentTeamCells[cellIndex],
      );
      const kingEnemies = getKingEnemies(testAfterStepCells, currentFigure.team);
      if (!kingEnemies) return true;
    }
  }

  return false;
}

export function getKingEnemies(cells: Cell[], currentTeam: FigureTeam): Cell[] {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const enemyTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team !== currentTeam,
  );
  const kingCellId = cellsWithFigures.find(
    (cell) => cell.figure!.team === currentTeam && cell.checkIsKing(),
  )!.id;

  const kingEnemies: Cell[] = [];

  enemyTeamCells.forEach((enemyCell) => {
    const cellSteps = getSteps(cells, enemyCell);
    cellSteps.forEach((step) => {
      step.cellId === kingCellId && kingEnemies.push(enemyCell);
    });
  });

  return kingEnemies;
}

export const resetCellsHighlight = (cells: Cell[]) =>
  cells.map((cell) => {
    if (cell.highlight === HighlightType.NONE) return cell;
    return {
      ...cell,
      highlight: HighlightType.NONE,
    };
  });

export const handleFigureSelect = (cells: Cell[], cellId: CellIdType, steps: IStep[]) =>
  cells.map((cell) => {
    if (cell.id === cellId) return { ...cell, highlight: HighlightType.SELECTED };
    const stepCell = steps.find((step) => step.cellId === cell.id);
    if (stepCell)
      return {
        ...cell,
        highlight: stepCell.highlight as HighlightType,
        enPassantCellId: stepCell.enPassantCellId || null,
      };
    return cell;
  });

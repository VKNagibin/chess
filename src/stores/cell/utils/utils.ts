import Cell from '@/entities/Cell/Cell';
import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import handlersByFigureTypeMap from '@/stepsController';

import { IStep } from '../types';

const stepTypeHighlightList = [HighlightType.KILL_STEP, HighlightType.DEFAULT_STEP];

export function checkIsKing(cell: Cell): boolean {
  if (!cell.figure) return false;
  return cell.figure.type === FigureType.KING;
}

export const getEnemyTeam = (team: FigureTeam) =>
  team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK;

export const findById = (list: { id: string }[], id: string) =>
  list.find((item) => item.id === id);

export const checkIsStep = (highlightType: HighlightType): boolean =>
  stepTypeHighlightList.includes(highlightType);

export const findFocusedCell = (cells: Cell[]) =>
  cells.find((cell) => cell.highlight === HighlightType.SELECTED);

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

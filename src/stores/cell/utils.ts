import Cell from '@/entities/Cell/Cell';
import {
  cellCharsList,
  cellNumbersReversedList,
  CELLS_COUNT_IN_ROW,
} from '@/entities/Cell/constants';
import { CellColor, FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CharValueType, NumberValueType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';
import { stepTypeHighlightList } from '@/stores/cell';
import { teamsConfigs } from '@/stores/cell/placesConfig';
import { getCellId } from '@/utils';

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

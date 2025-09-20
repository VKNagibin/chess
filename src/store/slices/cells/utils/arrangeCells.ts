import Cell from '@/entities/Cell/Cell';
import {
  cellCharsList,
  cellNumbersReversedList,
  CELLS_COUNT_IN_ROW,
} from '@/entities/Cell/constants';
import { CellColor, FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { CharValueType, ICell, NumberValueType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure/Figure';
import { getCellId } from '@/services/stepsController/utils';
import { ConfigItemType } from '@/store/slices/cells/placesConfig';

export default function (config: Record<FigureTeam, ConfigItemType[]>): ICell[] {
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

    if (!isEvenRow && isEvenCell)
      return new Cell(cellId, CellColor.BLACK).toPlainObject();
    if (isEvenRow && !isEvenCell)
      return new Cell(cellId, CellColor.BLACK).toPlainObject();
    return new Cell(cellId, CellColor.WHITE).toPlainObject();
  });

  arrangeFiguresIntoCells(cells, config);
  return cells;
}

function arrangeFiguresIntoCells(
  cells: ICell[],
  config: Record<FigureTeam, ConfigItemType[]>,
) {
  const teamsNames = Object.keys(config) as FigureTeam[];
  teamsNames.forEach((teamName) => {
    const teamConfigs = config[teamName];
    teamConfigs.forEach((figureConfigs) => {
      const targetCellsList = figureConfigs.cellsIds.map(
        (cellId) => cells.find((cell) => cell.id === cellId)!,
      );
      targetCellsList.forEach((cell) => {
        cell.figure = new Figure(figureConfigs.figure, teamName).toPlainObject();
        if (cell.figure.team === FigureTeam.WHITE) cell.highlight = HighlightType.TEAM;
        if (cell.figure.team === FigureTeam.BLACK) cell.highlight = HighlightType.ENEMY;
      });
    });
  });
}

import Cell from '@/Cell';
import Figure from '@/Figure';

import { cellCharsList, cellNumbersReversedList, CELLS_COUNT_IN_ROW } from './constants';
import { CellColor, FigureTeam, HighlightType } from './enums';
import { figuresPlacesConfig } from './placesConfig';
import { CharValueType, NumberValueType } from './types';

function getCellId(char: CharValueType, number: NumberValueType): string {
  return `${char}${number}`;
}

class Board {
  highlightHandler?: () => any;

  private static board: Board;

  constructor() {
    this.initBoard();
  }

  public static getBoard(): Board {
    if (!Board.board) {
      Board.board = new Board();
    }
    return Board.board;
  }

  initBoard() {
    this.initCells();
    this.initFigures();
    this.arrangeFigures();
  }

  cells: Cell[] = [];

  figures: Figure[] = [];

  // stepController: StepController;
  focusedCellId?: string;

  findCell = (id: string) => this.cells.find((cell) => cell.id === id);

  changeHighlighted = (id: string, handler: () => any) => {
    if (this.focusedCellId === id) return;

    if (this.focusedCellId) {
      const prevSelectedCell = this.findCell(this.focusedCellId);
      prevSelectedCell && (prevSelectedCell.highlight = HighlightType.NONE);
    }

    const currentFocusedCell = this.findCell(id);
    currentFocusedCell && (currentFocusedCell.highlight = HighlightType.SELECTED);

    this.focusedCellId = id;
    this.highlightHandler && this.highlightHandler();
    this.highlightHandler = handler;
  };

  initFigures = () => {
    const teamsConfigs = Object.keys(figuresPlacesConfig);
    teamsConfigs.forEach((teamConfigs) => {
      const teamConfigsList = figuresPlacesConfig[teamConfigs as FigureTeam];
      teamConfigsList.forEach((figureConfigs) => {
        figureConfigs.cellIds.forEach((cellId) => {
          const figure = new Figure(
            figureConfigs.figure,
            teamConfigs as FigureTeam,
            cellId,
          );
          this.figures.push(figure);
        });
      });
    });
  };

  arrangeFigures() {
    this.figures.forEach((figure) => {
      const currentCell = this.findCell(figure.cellId);
      if (!currentCell) return;

      currentCell.figure = figure;
    });
  }

  initCells = (): void => {
    const cellsList = new Array(64).fill(undefined);

    this.cells = cellsList.map((_, index) => {
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
  };
}

export default Board;

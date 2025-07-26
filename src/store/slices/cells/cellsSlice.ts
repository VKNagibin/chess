import { createSlice } from '@reduxjs/toolkit';

import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import { findById } from '@/shared/utils/findById';
import arrangeCells from '@/store/slices/cells/utils/arrangeCells';
import handleCellFocus from '@/store/slices/cells/utils/handleCellFocus';

import { handleStep } from './utils/handleStep';

export interface ICellsState {
  cells: ICellAsPlainObject[];
  currentTeam: FigureTeam;
}

const initialState: ICellsState = {
  cells: arrangeCells(),
  currentTeam: FigureTeam.WHITE,
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    clickOnCell({ cells, currentTeam }, action) {
      const { cellId } = action.payload;
      handleCellFocus({ currentTeam, cellId, cells });
    },
    mutateFigure({ cells, currentTeam }, action) {
      const { cellId, figureType } = action.payload;
      const cell = cells.find((cell) => cell.id === cellId);
      if (!cell?.figure) return;
      cell.figure.type = figureType;
      cell.highlight = HighlightType.SELECTED;
      handleStep({
        currentTeam,
        currentCell: findById(cellId, cells) as ICellAsPlainObject,
        cells,
      });
    },
    setCellCoordinates({ cells }, action) {
      const cell = cells.find((cell) => cell.id === action.payload.id);
      cell!.coordinates = {
        x: action.payload.x,
        y: action.payload.y,
      };
    },
  },
});

export const cellsActions = cellsSlice.actions;

export default cellsSlice.reducer;

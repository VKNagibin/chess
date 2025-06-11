import { createSlice } from '@reduxjs/toolkit';

import { ICellAsPlainObject } from '@/entities/Cell/types';
import arrangeCells from '@/redux/slices/cells/utils/arrangeCells';
import handleCellFocus from '@/redux/slices/cells/utils/handleCellFocus';

export interface ICellsState {
  cells: ICellAsPlainObject[];
}

const initialState: ICellsState = {
  cells: arrangeCells(),
};

export const cellsSlice = createSlice({
  name: 'cells',
  initialState,
  reducers: {
    clickOnCell({ cells }, action) {
      handleCellFocus({ cells, ...action.payload });
    },
    resetCellsAnimation({ cells }) {
      cells.forEach((cell) => {
        if (cell.animationConfig) cell.animationConfig = null;
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

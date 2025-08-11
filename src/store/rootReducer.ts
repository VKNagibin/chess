import { combineReducers, Reducer } from '@reduxjs/toolkit';

import cellsReducer, { ICellsState } from '@/store/slices/cells/cellsSlice';
import figuresAnimationsReducer from '@/store/slices/figuresAnimationsSlice';

const rootReducer = combineReducers({
  cells: cellsReducer as Reducer<ICellsState>,
  figuresAnimations: figuresAnimationsReducer,
});

export default rootReducer;

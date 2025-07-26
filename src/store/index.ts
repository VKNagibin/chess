import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import cellsReducer, { ICellsState } from '@/store/slices/cells/cellsSlice';
import currentTeamReducer from '@/store/slices/currentTeamSlice';
import figuresAnimationsReducer from '@/store/slices/figuresAnimationsSlice';

const rootReducer = combineReducers({
  cells: cellsReducer as Reducer<ICellsState>,
  currentTeam: currentTeamReducer,
  figuresAnimations: figuresAnimationsReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

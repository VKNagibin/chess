import { combineReducers, configureStore, Reducer } from '@reduxjs/toolkit';

import cellsReducer, { ICellsState } from '@/redux/slices/cells/cellsSlice';
import currentTeamReducer from '@/redux/slices/currentTeamSlice';

const rootReducer = combineReducers({
  cells: cellsReducer as Reducer<ICellsState>,
  currentTeam: currentTeamReducer,
});
export const store = configureStore({
  reducer: rootReducer,
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

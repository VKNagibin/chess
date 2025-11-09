import { combineReducers, Reducer } from '@reduxjs/toolkit';

import appReducer from '@/store/slices/appSlice';
import gameEngineReducer, { IGameEngineState } from '@/store/slices/cells/cellsSlice';
import figuresAnimationsReducer from '@/store/slices/figuresAnimationsSlice';

const rootReducer = combineReducers({
  app: appReducer,
  gameEngine: gameEngineReducer as Reducer<IGameEngineState>,
  figuresAnimations: figuresAnimationsReducer,
});

export default rootReducer;

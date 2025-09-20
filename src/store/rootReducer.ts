import { combineReducers, Reducer } from '@reduxjs/toolkit';

import gameEngineReducer, { IGameEngineState } from '@/store/slices/cells/cellsSlice';
import figuresAnimationsReducer from '@/store/slices/figuresAnimationsSlice';

const rootReducer = combineReducers({
  gameEngine: gameEngineReducer as Reducer<IGameEngineState>,
  figuresAnimations: figuresAnimationsReducer,
});

export default rootReducer;

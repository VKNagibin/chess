import { configureStore } from '@reduxjs/toolkit';

import fetchBestMoveMiddleware from '@/store/middlewares/fetchBestMoveMiddleware';
import makeEnemyStepMiddleware from '@/store/middlewares/makeEnemyStepMiddleware';
import rootReducer from '@/store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
      fetchBestMoveMiddleware.middleware,
      makeEnemyStepMiddleware.middleware,
    ]),
});

export const dispatch = store.dispatch;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

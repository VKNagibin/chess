import { configureStore } from '@reduxjs/toolkit';

import changeActiveTeamMiddleware from '@/store/middlewares/changeActiveTeamMiddleware';
import fetchBestMoveMiddleware from '@/store/middlewares/fetchBestMoveMiddleware';
import makeEnemyMoveMiddleware from '@/store/middlewares/makeEnemyMoveMiddleware';
import rootReducer from '@/store/rootReducer';

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend([
      changeActiveTeamMiddleware.middleware,
      fetchBestMoveMiddleware.middleware,
      makeEnemyMoveMiddleware.middleware,
    ]),
});

export const dispatch = store.dispatch;

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = AppStore['dispatch'];

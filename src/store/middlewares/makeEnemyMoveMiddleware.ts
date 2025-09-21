import { createListenerMiddleware } from '@reduxjs/toolkit';

import { RootState, store } from '@/store';
import rootActions from '@/store/rootActions';

const illegalActions = ['gameEngine/clickOnCell'];

const makeEnemyMoveMiddleware = createListenerMiddleware();

makeEnemyMoveMiddleware.startListening({
  predicate: (action, currentState) => {
    const { type: actionType } = action;

    const { animationsInAction } = (currentState as RootState).figuresAnimations;
    const {
      activeTeam,
      userTeam,
      cellWithMutablePawnId,
      nextMove,
      errorMessage,
      deadKingTeam,
    } = (currentState as RootState).gameEngine;

    if (
      animationsInAction ||
      !nextMove ||
      activeTeam === userTeam ||
      errorMessage ||
      cellWithMutablePawnId ||
      deadKingTeam
    )
      return false;

    return !illegalActions.includes(actionType);
  },
  effect: async (_, { delay, dispatch }) => {
    const { nextMove } = (store.getState() as RootState).gameEngine;
    dispatch(rootActions.setNextMove(null));

    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove!.substring(0, 2) }));
    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove!.substring(2, 4) }));
    dispatch(rootActions.finishEngineLoading());
  },
});

export default makeEnemyMoveMiddleware;

import { createListenerMiddleware } from '@reduxjs/toolkit';

import { RootState, store } from '@/store';
import rootActions from '@/store/rootActions';

const illegalActions = ['gameEngine/clickOnCell'];

const makeEnemyStepMiddleware = createListenerMiddleware();

makeEnemyStepMiddleware.startListening({
  predicate: (action, currentState) => {
    const { type: actionType } = action;

    const { animationsInAction } = (currentState as RootState).figuresAnimations;
    const {
      activeTeam,
      userTeam,
      cellWithMutablePawnId,
      nextMove,
      errorMessage,
      loading,
      deadKingTeam,
    } = (currentState as RootState).gameEngine;

    if (
      animationsInAction ||
      !nextMove ||
      activeTeam === userTeam ||
      errorMessage ||
      cellWithMutablePawnId ||
      loading ||
      deadKingTeam
    )
      return false;

    return !illegalActions.includes(actionType);
  },
  effect: async (_, { delay, dispatch }) => {
    const { nextMove } = (store.getState() as RootState).gameEngine;
    const savedNaxtMove = nextMove;
    dispatch(rootActions.setNextMove(null));

    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove!.substring(0, 2) }));
    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove!.substring(2, 4) }));
  },
});

export default makeEnemyStepMiddleware;

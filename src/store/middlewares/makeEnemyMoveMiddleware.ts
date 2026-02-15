import { createListenerMiddleware } from '@reduxjs/toolkit';

import { FigureType } from '@/entities/Cell/enums';
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
    if (!nextMove) {
      dispatch(rootActions.finishEngineLoading());
      return;
    }

    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove.substring(0, 2) }));
    await delay(300);
    dispatch(rootActions.clickOnCell({ cellId: nextMove.substring(2, 4) }));
    await delay(500);

    if (nextMove.length > 4) {
      dispatch(
        rootActions.mutateFigure({
          cellId: nextMove!.substring(2, 4),
          figureType: FigureType.QUEEN,
        }),
      );
    }

    dispatch(rootActions.finishEngineLoading());
  },
});

export default makeEnemyMoveMiddleware;

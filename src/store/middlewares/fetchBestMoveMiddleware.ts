import { createListenerMiddleware } from '@reduxjs/toolkit';

import { FigureTeam } from '@/entities/Cell/enums';
import StepsService from '@/services/StepsService';
import { RootState, store } from '@/store';
import rootActions from '@/store/rootActions';

const fetchBestMoveMiddleware = createListenerMiddleware();

const legalActions = ['gameEngine/clickOnCell', 'gameEngine/mutateFigure'];

fetchBestMoveMiddleware.startListening({
  predicate: (action, currentState) => {
    const { type: actionType } = action;

    const { canChangeTeam, activeTeam, userTeam, cellWithMutablePawnId } = (
      currentState as RootState
    ).gameEngine;

    if (actionType === 'gameEngine/selectTeam' && userTeam === FigureTeam.BLACK)
      return true;

    if (cellWithMutablePawnId || activeTeam !== userTeam) return false;
    return canChangeTeam && legalActions.includes(actionType);
  },
  effect: async (_, { dispatch }) => {
    const { gameEngine } = store.getState();
    dispatch(rootActions.startEngineLoading());
    const response = await StepsService.getBestMove({ FEN: gameEngine.FEN! });
    if (!response?.success) {
      dispatch(rootActions.setEngineError(response?.messages));
      dispatch(rootActions.finishEngineLoading());
      return;
    }
    dispatch(rootActions.setNextMove(response.data));
  },
});

export default fetchBestMoveMiddleware;

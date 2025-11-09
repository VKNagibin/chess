import { createListenerMiddleware } from '@reduxjs/toolkit';

import { FigureTeam } from '@/entities/Cell/enums';
import ChessBot from '@/services/ChessBot';
import { RootState, store } from '@/store';
import rootActions from '@/store/rootActions';

const fetchBestMoveMiddleware = createListenerMiddleware();

const legalActions = [
  'gameEngine/clickOnCell',
  'gameEngine/mutateFigure',
  'gameEngine/startGame',
];

fetchBestMoveMiddleware.startListening({
  predicate: (action, currentState) => {
    const { type: actionType } = action;

    const { canChangeTeam, activeTeam, userTeam, cellWithMutablePawnId, deadKingTeam } = (
      currentState as RootState
    ).gameEngine;

    if (actionType === 'gameEngine/startGame' && userTeam === FigureTeam.BLACK)
      return true;

    if (cellWithMutablePawnId || deadKingTeam || activeTeam !== userTeam) return false;
    return canChangeTeam && legalActions.includes(actionType);
  },
  effect: async (_, { dispatch }) => {
    const { gameEngine } = store.getState();
    dispatch(rootActions.startEngineLoading());
    const response = await ChessBot.getBestMove({
      FEN: gameEngine.FEN!,
      difficulty: gameEngine.difficultyLevel,
    });
    if (!response?.success) {
      dispatch(rootActions.setEngineError(response?.messages));
      dispatch(rootActions.finishEngineLoading());
      return;
    }
    dispatch(rootActions.setNextMove(response.data));
  },
});

export default fetchBestMoveMiddleware;

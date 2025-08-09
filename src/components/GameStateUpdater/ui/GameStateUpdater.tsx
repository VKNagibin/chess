import { useEffect } from 'react';

import useGameUpdater from '../hooks/useGameUpdater';

const GameStateUpdater = () => {
  const {
    figureAnimationsInAction,
    cellWithMutablePawnId,
    deadKingTeam,
    canChangeTeam,
    handlePawnMutation,
    handleGameOver,
    changeActiveTeam,
  } = useGameUpdater();

  useEffect(() => {
    if (figureAnimationsInAction) return;
    if (deadKingTeam) handleGameOver(deadKingTeam);
    if (cellWithMutablePawnId) handlePawnMutation(cellWithMutablePawnId);
    if (canChangeTeam) changeActiveTeam();
  }, [figureAnimationsInAction]);

  return <></>;
};

export default GameStateUpdater;

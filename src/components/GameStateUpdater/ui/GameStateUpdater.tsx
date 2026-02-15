import { useEffect } from 'react';

import useGameUpdater from '../hooks/useGameUpdater';

const GameStateUpdater = () => {
  const {
    isMyStep,
    actionsBlocked,
    cellWithMutablePawnId,
    deadKingTeam,
    handlePawnMutation,
    handleGameOver,
  } = useGameUpdater();

  useEffect(() => {
    if (actionsBlocked) return;
    if (deadKingTeam) {
      handleGameOver(deadKingTeam);
      return;
    }
    if (cellWithMutablePawnId && isMyStep) handlePawnMutation(cellWithMutablePawnId);
  }, [actionsBlocked]);

  return <></>;
};

export default GameStateUpdater;

import { useEffect } from 'react';

import useGameUpdater from '../hooks/useGameUpdater';

const GameStateUpdater = () => {
  const {
    actionsBlocked,
    cellWithMutablePawnId,
    deadKingTeam,
    handlePawnMutation,
    handleGameOver,
  } = useGameUpdater();

  useEffect(() => {
    if (actionsBlocked) return;
    if (deadKingTeam) handleGameOver(deadKingTeam);
    if (cellWithMutablePawnId) handlePawnMutation(cellWithMutablePawnId);
  }, [actionsBlocked]);

  return <></>;
};

export default GameStateUpdater;

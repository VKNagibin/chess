import { useEffect } from 'react';

import useGameUpdater from '../hooks/useGameUpdater';

const GameStateUpdater = () => {
  const {
    actionsBlocked,
    cellWithMutablePawnId,
    deadKingTeam,
    canChangeTeam,
    handlePawnMutation,
    handleGameOver,
    changeActiveTeam,
  } = useGameUpdater();

  useEffect(() => {
    if (actionsBlocked) return;
    if (deadKingTeam) handleGameOver(deadKingTeam);
    if (cellWithMutablePawnId) handlePawnMutation(cellWithMutablePawnId);
    if (canChangeTeam) changeActiveTeam();
  }, [actionsBlocked]);

  return <></>;
};

export default GameStateUpdater;

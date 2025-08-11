import { useEffect } from 'react';

import useGameUpdater from '../hooks/useGameUpdater';

const StaticGameStateUpdater = () => {
  const {
    cellWithMutablePawnId,
    deadKingTeam,
    canChangeTeam,
    handlePawnMutation,
    handleGameOver,
    changeActiveTeam,
  } = useGameUpdater();

  useEffect(() => {
    if (deadKingTeam) handleGameOver(deadKingTeam);
    if (cellWithMutablePawnId) handlePawnMutation(cellWithMutablePawnId);
    if (canChangeTeam) changeActiveTeam();
  }, [deadKingTeam, cellWithMutablePawnId, canChangeTeam]);

  return <></>;
};

export default StaticGameStateUpdater;

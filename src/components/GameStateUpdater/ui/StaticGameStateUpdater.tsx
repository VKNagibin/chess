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
  }, [deadKingTeam]);

  useEffect(() => {
    if (cellWithMutablePawnId) handlePawnMutation(cellWithMutablePawnId);
  }, [cellWithMutablePawnId]);

  useEffect(() => {
    if (canChangeTeam) changeActiveTeam();
  }, [canChangeTeam]);

  return <></>;
};

export default StaticGameStateUpdater;

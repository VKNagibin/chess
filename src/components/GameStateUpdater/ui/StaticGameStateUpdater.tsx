import { useEffect } from 'react';

import { useAppActions } from '@/store/hooks';

import useGameUpdater from '../hooks/useGameUpdater';

const StaticGameStateUpdater = () => {
  const {
    canChangeTeam,
    cellWithMutablePawnId,
    deadKingTeam,
    handlePawnMutation,
    handleGameOver,
  } = useGameUpdater();

  const { changeActiveTeam } = useAppActions();

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

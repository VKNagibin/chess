import { useEffect } from 'react';

import useGameOver from '@/components/GameStateUpdater/hooks/useGameOver';
import usePawnMutation from '@/components/GameStateUpdater/hooks/usePawnMutation';
import Logger from '@/services/Logger';
import { useAppActions, useAppSelector } from '@/store/hooks';

const useGameUpdater = () => {
  const { handlePawnMutation } = usePawnMutation();
  const { handleGameOver } = useGameOver();
  const { changeActiveTeam } = useAppActions();

  const {
    figureAnimationsInAction,
    cellWithMutablePawnId,
    deadKingTeam,
    canChangeTeam,
    FEN,
  } = useAppSelector(({ figuresAnimations, cells }) => ({
    deadKingTeam: cells.deadKingTeam,
    FEN: cells.FEN,
    canChangeTeam: cells.canChangeTeam,
    cellWithMutablePawnId: cells.cellWithMutablePawnId,
    figureAnimationsInAction: figuresAnimations.animationsInAction,
  }));

  useEffect(() => {
    if (!FEN) return;
    Logger.log('FEN', FEN);
  }, [FEN]);

  return {
    figureAnimationsInAction,
    cellWithMutablePawnId,
    deadKingTeam,
    canChangeTeam,
    handlePawnMutation,
    handleGameOver,
    changeActiveTeam,
  };
};

export default useGameUpdater;

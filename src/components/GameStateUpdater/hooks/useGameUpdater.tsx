import { useLayoutEffect } from 'react';

import useGameOver from '@/components/GameStateUpdater/hooks/useGameOver';
import usePawnMutation from '@/components/GameStateUpdater/hooks/usePawnMutation';
import { useAppSelector } from '@/store/hooks';

import useWelcomeModal from './useWelcomeModal';

const useGameUpdater = () => {
  const { handlePawnMutation } = usePawnMutation();
  const { handleGameOver } = useGameOver();
  const { welcomeUser } = useWelcomeModal();
  const { cellWithMutablePawnId, deadKingTeam, loading, errorMessage } = useAppSelector(
    ({ gameEngine }) => gameEngine,
  );

  const figuresAnimations = useAppSelector(({ figuresAnimations }) => figuresAnimations);

  useLayoutEffect(() => {
    welcomeUser();
  }, []);

  return {
    actionsBlocked: figuresAnimations.animationsInAction || loading || errorMessage,
    cellWithMutablePawnId,
    deadKingTeam,
    handlePawnMutation,
    handleGameOver,
  };
};

export default useGameUpdater;

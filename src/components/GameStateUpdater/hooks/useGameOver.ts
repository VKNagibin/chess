import { useCallback } from 'react';

import { FigureTeam } from '@/entities/Cell/enums';
import GameOverModal from '@/modals/GameOverModal';
import useModal from '@/shared/components/Modal/useModal';
import { useAppActions } from '@/store/hooks';
import { getEnemyTeam } from '@/store/slices/cells/utils/helpers';

const useGameOver = () => {
  const { openModal } = useModal();
  const { startNewGame, resetFiguresAnimationsState } = useAppActions();

  const handleGameOver = async (team: FigureTeam) => {
    try {
      await openModal(GameOverModal, {
        team: getEnemyTeam(team),
      });
      resetFiguresAnimationsState();
      startNewGame(null);
    } catch (error) {
      console.error('Ошибка в модальном окне окончания партии: ', error);
    }
  };

  return {
    handleGameOver,
  };
};

export default useGameOver;

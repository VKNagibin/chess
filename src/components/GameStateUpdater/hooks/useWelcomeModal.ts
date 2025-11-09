import { useCallback } from 'react';

import WelcomeModal from '@/modals/WelcomeModal';
import useModal from '@/shared/components/Modal/useModal';
import { useAppActions } from '@/store/hooks';

const useWelcomeModal = () => {
  const { openModal } = useModal();

  const { startGame } = useAppActions();

  const welcomeUser = useCallback(async () => {
    try {
      await openModal({
        ui: WelcomeModal,
        options: {
          customId: 'welcomeModal',
        },
      });
      startGame();
    } catch (error) {
      console.error('Ошибка в модальном окне начала игры: ', error);
    }
  }, []);

  return {
    welcomeUser,
  };
};

export default useWelcomeModal;

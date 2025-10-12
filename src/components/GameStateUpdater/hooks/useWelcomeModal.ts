import { useCallback } from 'react';

import WelcomeModal from '@/modals/WelcomeModal';
import useModal from '@/shared/components/Modal/useModal';
import { useAppActions } from '@/store/hooks';

const useWelcomeModal = () => {
  const { openModal } = useModal();
  const { selectTeam } = useAppActions();

  const welcomeUser = useCallback(async () => {
    try {
      const selectedTeam = await openModal(WelcomeModal, null, {
        customId: 'welcomeModal',
      });
      selectTeam(selectedTeam);
    } catch (error) {
      console.error('Ошибка в модальном окне начала игры: ', error);
    }
  }, []);

  return {
    welcomeUser,
  };
};

export default useWelcomeModal;

import WelcomeModal from '@/modals/WelcomeModal';
import useModal from '@/shared/components/Modal/useModal';
import { useAppActions } from '@/store/hooks';

const useWelcomeModal = () => {
  const { openModal, closeAllModals } = useModal();
  const { selectTeam } = useAppActions();

  const welcomeUser = async () => {
    try {
      const selectedTeam = await openModal(WelcomeModal);
      selectTeam(selectedTeam);
      closeAllModals();
    } catch (error) {
      console.error('Ошибка в модальном окне начала игры: ', error);
    }
  };

  return {
    welcomeUser,
  };
};

export default useWelcomeModal;

import { useContext } from 'react';

import { ModalContext } from '@/shared/components/Modal/ModalProvider';
import { emptyFunction } from '@/shared/constants';

const useModal = () => {
  const modalContext = useContext(ModalContext);

  return {
    openModal: modalContext?.openModal || emptyFunction,
    closeModal: modalContext?.closeModal || emptyFunction,
    closeAllModals: modalContext?.closeAllModals || emptyFunction,
  };
};

export default useModal;

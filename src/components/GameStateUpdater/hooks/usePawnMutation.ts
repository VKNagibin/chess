import { useCallback } from 'react';

import { CellIdType } from '@/entities/Cell/types';
import PawnMutateModal from '@/modals/PawnMutateModal';
import useModal from '@/shared/components/Modal/useModal';
import { useAppActions } from '@/store/hooks';

const usePawnMutation = () => {
  const { openModal } = useModal();

  const { mutateFigure } = useAppActions();

  const handlePawnMutation = useCallback(async (cellId: CellIdType) => {
    try {
      const selectedType = await openModal({
        ui: PawnMutateModal,
        props: {
          cellId,
        },
      });
      mutateFigure({ cellId, figureType: selectedType });
    } catch (error) {
      console.error('Ошибка в модальном окне мутации пешки: ', error);
    }
  }, []);

  return {
    handlePawnMutation,
  };
};

export default usePawnMutation;

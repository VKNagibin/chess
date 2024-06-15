import { useUnit } from 'effector-react';
import { useCallback, useState } from 'react';

import { FigureType } from '@/entities/Cell/enums';
import { onSelectFigureForMutate } from '@/stores/cell';
import {
  $isMutateModalOpened,
  $mutatingEntity,
  onCloseMutateModal,
} from '@/stores/pawnMutateModal';

export default function usePawnMutateModal() {
  const [isOpen, entityForMutation] = useUnit([$isMutateModalOpened, $mutatingEntity]);
  const [selectedType, setSelectedType] = useState<FigureType | null>(null);

  const onSubmit = useCallback(() => {
    onSelectFigureForMutate({
      type: selectedType!,
      cellId: entityForMutation!.cellId,
    });
    onCloseMutateModal();
  }, [entityForMutation, selectedType]);

  return {
    isOpen,
    selectedType,
    setSelectedType,
    entityForMutation,
    onSubmit,
  };
}

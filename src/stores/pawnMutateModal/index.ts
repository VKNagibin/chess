import { createEvent, createStore, sample } from 'effector';

import { FigureTeam } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';

interface IEntityForMutation {
  team: FigureTeam;
  cellId: CellIdType;
}

export const $isMutateModalOpened = createStore(false);
export const $mutatingEntity = createStore<IEntityForMutation | null>(null);

export const onOpenMutateModal = createEvent();
export const onCloseMutateModal = createEvent();

export const onStartPawnMutate = createEvent<IEntityForMutation>();

sample({
  clock: onStartPawnMutate,
  source: $mutatingEntity,
  filter: (entityForMutation) => !!entityForMutation,
  target: onOpenMutateModal,
});

$isMutateModalOpened.on(onOpenMutateModal, () => true);
$isMutateModalOpened.on(onCloseMutateModal, () => false);
$mutatingEntity.on(onStartPawnMutate, (_, entityForMutation) => entityForMutation);

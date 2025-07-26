import { useEffect, useRef } from 'react';

import { classByHighlightType } from '@/components/Cell/data';
import usePawnMutation from '@/components/Cell/hooks/usePawnMutation';
import {
  getCellCoordinates,
  getHoverClass,
  handleGameOver,
} from '@/components/Cell/utils';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { useAppActions, useAppSelector } from '@/store/hooks';

export default function useCellLogic(cell: ICellAsPlainObject) {
  const cellRef = useRef<HTMLButtonElement | null>(null);
  const { setCellCoordinates, changeTeam } = useAppActions();
  const { handlePawnMutation } = usePawnMutation();

  const { currentTeam, figureAnimationsInAction } = useAppSelector(
    ({ currentTeam, figuresAnimations }) => ({
      currentTeam: currentTeam.currentTeam,
      figureAnimationsInAction: figuresAnimations.animationsInAction,
    }),
  );

  const additionalClasses = `${cell.color} ${
    classByHighlightType[cell.highlight]
  } ${getHoverClass(cell, currentTeam)}`;

  const showFigure = cell.figure && !cell.hiddenFigure && !cell.animationConfig;

  useEffect(() => {
    if (figureAnimationsInAction) return;
    if (cell.isOver) handleGameOver(cell.figure!.team!);
    if (cell.allowNextStep) changeTeam();
    if (cell.allowPawnMutation) handlePawnMutation(cell.id);
  }, [figureAnimationsInAction]);

  useEffect(() => {
    cellRef.current &&
      setCellCoordinates({
        id: cell.id,
        ...getCellCoordinates(cellRef.current),
      });
  }, [cellRef.current]);

  return {
    currentTeam,
    additionalClasses,
    cellRef,
    showFigure,
  };
}

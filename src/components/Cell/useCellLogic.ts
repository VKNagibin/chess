import { useEffect, useRef } from 'react';

import { classByHighlightType } from '@/components/Cell/data';
import { getCellCoordinates, getHoverClass } from '@/components/Cell/utils';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import Cache from '@/services/Cache';
import { useAppActions } from '@/store/hooks';

export default function useCellLogic(cell: ICellAsPlainObject) {
  const cellRef = useRef<HTMLButtonElement | null>(null);
  const { setCellCoordinates } = useAppActions();
  const allowFiguresAnimations = Cache.get('figuresAnimations');

  const additionalClasses = `${cell.color}${
    classByHighlightType[cell.highlight]
  }${getHoverClass(cell)}`;

  const withAnimation = allowFiguresAnimations ? cell.animationConfig.length : false;

  const showFigure = cell.figure && !cell.hiddenFigure && !withAnimation;

  useEffect(() => {
    if (!cellRef.current || cell.coordinates) return;
    setCellCoordinates({
      id: cell.id,
      ...getCellCoordinates(cellRef.current),
    });
  }, [cellRef.current, cell.coordinates]);

  return {
    additionalClasses,
    cellRef,
    showFigure,
    withAnimation,
  };
}

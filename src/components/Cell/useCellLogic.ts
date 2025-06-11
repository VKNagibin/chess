import { useEffect, useRef } from 'react';

import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { useAppActions, useAppSelector } from '@/redux/hooks';

import {
  classByHighlightType,
  kingAnimationKeyframes,
  kingAnimationOptions,
} from './data';
import { getHoverClass } from './utils';

export default function useCellLogic(cell: ICellAsPlainObject) {
  const cellRef = useRef<HTMLButtonElement | null>(null);
  const { setCellCoordinates } = useAppActions();
  const currentStepTeam = useAppSelector((state) => state.currentTeam.currentTeam);

  const hoverClass = getHoverClass(cell, currentStepTeam);
  const showFigure = !cell.animationConfig && cell.figure && !cell.hiddenFigure;

  const className = `${cell.color} ${classByHighlightType[cell.highlight]} ${hoverClass}`;

  useEffect(() => {
    if (cell.isOver) {
      setTimeout(() => {
        alert(
          `Game over! ${
            cell.figure?.team === FigureTeam.BLACK ? FigureTeam.BLACK : FigureTeam.WHITE
          } team win!`,
        );
      }, 200);
    }
  }, [cell.isOver]);

  // useEffect(() => {
  //   if (
  //     cell.highlight === HighlightType.SELECTED ||
  //     !cell.figure ||
  //     !cell.figure?.isUnderAttack
  //   )
  //     return;
  //   iconRef?.current?.reactWrapper?.animate?.(
  //     kingAnimationKeyframes,
  //     kingAnimationOptions,
  //   );
  // });

  useEffect(() => {
    if (!cellRef.current) return;

    const {
      height = 0,
      left = 0,
      width = 0,
      top = 0,
    } = cellRef.current!.getBoundingClientRect();

    setCellCoordinates({
      id: cell.id,
      x: parseInt(String(left - width / 2)),
      y: parseInt(String(top - height / 2)),
    });
  }, [cellRef.current]);

  return {
    hoverClass,
    currentStepTeam,
    className,
    cellRef,
    showFigure,
  };
}

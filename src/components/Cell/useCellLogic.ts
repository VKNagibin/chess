import { useUnit } from 'effector-react';
import { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { onCellFocus } from '@/stores/cell';
import { onGameOver } from '@/stores/events';
import { $currentStepTeam } from '@/stores/team';

import {
  classByHighlightType,
  kingAnimationKeyframes,
  kingAnimationOptions,
} from './data';
import { getHoverClass } from './utils';

export default function useCellLogic(cell: Cell) {
  const cellRef = useRef<HTMLButtonElement | null>(null);
  const iconRef = useRef<ReactSVG | null>(null);
  const [handleCellFocus, handleGameOver, currentStepTeam] = useUnit([
    onCellFocus,
    onGameOver,
    $currentStepTeam,
  ]);

  const hoverClass = getHoverClass(cell, currentStepTeam);
  const tabIndex = cell.figure ? 0 : -1;
  const showFigure = !cell.animationConfig && cell.figure && !cell.hiddenFigure;

  const className = `cell ${cell.color} ${
    classByHighlightType[cell.highlight]
  } ${hoverClass}`;

  useEffect(() => {
    if (cell.isOver) {
      setTimeout(() => {
        handleGameOver();

        alert(
          `Game over! ${
            cell.figure?.team === FigureTeam.BLACK ? FigureTeam.BLACK : FigureTeam.WHITE
          } team win!`,
        );
      }, 200);
    }
  }, [cell.isOver]);

  useEffect(() => {
    if (
      cell.highlight === HighlightType.SELECTED ||
      !cell.figure ||
      !cell.figure?.isUnderAttack
    )
      return;
    iconRef?.current?.reactWrapper?.animate?.(
      kingAnimationKeyframes,
      kingAnimationOptions,
    );
  });

  useEffect(() => {
    if (!cellRef.current) return;
    const {
      height = 0,
      left = 0,
      width = 0,
      top = 0,
    } = cellRef.current.getBoundingClientRect();

    cell.setCoordinates(
      parseInt(String(left - width / 2)),
      parseInt(String(top - height / 2)),
    );
  }, [cellRef.current]);

  return {
    hoverClass,
    tabIndex,
    currentStepTeam,
    className,
    iconRef,
    cellRef,
    showFigure,
    handleCellFocus,
  };
}

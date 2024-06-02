import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import { onCellFocus } from '@/stores/cell';
import { onGameOver } from '@/stores/events';
import { $currentStepTeam } from '@/stores/team';

import { classByHighlightType } from './data';
import { getHoverClass } from './utils';

export default function useCellLogic(cell: Cell) {
  const [handleCellFocus, handleGameOver, currentStepTeam] = useUnit([
    onCellFocus,
    onGameOver,
    $currentStepTeam,
  ]);

  const hoverClass = getHoverClass(cell, currentStepTeam);
  const tabIndex = cell.figure ? 0 : -1;

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

  return {
    hoverClass,
    tabIndex,
    currentStepTeam,
    className,
    handleCellFocus,
  };
}

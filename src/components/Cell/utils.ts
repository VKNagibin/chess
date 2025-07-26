import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { RectangularCoordinatesType } from '@/shared/types';
import { checkIsStep } from '@/store/slices/cells/utils/helpers';
import { getEnemyTeam } from '@/store/slices/cells/utils/helpers';

export const getHoverClass = (cell: ICellAsPlainObject, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  if (isStep) return 'filled';
  if (isCurrentTeam) return 'currentTeam';
};

export const getCellCoordinates = (
  cellElement: HTMLButtonElement,
): RectangularCoordinatesType => {
  const {
    height = 0,
    left = 0,
    width = 0,
    top = 0,
  } = cellElement.getBoundingClientRect();

  return {
    x: parseInt(String(left - width / 2)),
    y: parseInt(String(top - height / 2)),
  };
};

export const handleGameOver = (team: FigureTeam) => {
  setTimeout(() => {
    alert(`Game over! ${getEnemyTeam(team)} team win!`);
  });
};

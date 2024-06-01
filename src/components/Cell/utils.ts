import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import Figure from '@/entities/Figure';
import { checkIsStep } from '@/stores/cell/utils';

export const getHoverClass = (cell: Cell, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  return isStep || isCurrentTeam ? 'filled' : '';
};

export const getFigureSvgName = (figure: Figure) => `${figure.type}_${figure.team}`;

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { checkIsStep } from '@/stores/cell/utils/helpers';

export const getHoverClass = (cell: Cell, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  return isStep || isCurrentTeam ? 'filled' : '';
};

interface IFigureSvgData {
  type: FigureType;
  team: FigureTeam;
}

export const getFigureSvgName = (figure: IFigureSvgData) =>
  `${figure.type}_${figure.team}`;

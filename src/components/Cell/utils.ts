import { FigureSvgNameType } from '@/assets/figures';
import Cell from '@/entities/Cell/Cell';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { checkIsStep } from '@/stores/cell/utils/helpers';

interface IFigureSvgData {
  type: FigureType;
  team: FigureTeam;
}

export const getHoverClass = (cell: Cell, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  return isStep || isCurrentTeam ? 'filled' : '';
};

export const getFigureSvgName = (figure: IFigureSvgData): FigureSvgNameType =>
  `${figure.type}_${figure.team}`;

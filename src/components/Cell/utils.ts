import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { FigureSvgNameType } from '@/entities/Figure';
import { checkIsStep } from '@/redux/slices/cells/utils/helpers';

interface IFigureSvgData {
  type: FigureType;
  team: FigureTeam;
}

export const getHoverClass = (cell: ICellAsPlainObject, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  if (isStep) return 'filled';
  if (isCurrentTeam) return 'currentTeam';
};

export const getFigureSvgName = (figure: IFigureSvgData): FigureSvgNameType =>
  `${figure.type}_${figure.team}`;

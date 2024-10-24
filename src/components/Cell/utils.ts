import { FigureSvgNameType } from '@/assets/figures';
import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import { checkIsStep } from '@/stores/cell/utils/helpers';

interface IFigureSvgData {
  type: FigureType;
  team: FigureTeam;
}

export const getHoverClass = ({
  figureTeam,
  highlight,
  currentStepTeam,
}: {
  figureTeam?: FigureTeam;
  highlight: HighlightType;
  currentStepTeam?: FigureTeam | null;
}) => {
  if (!currentStepTeam) return;
  const isStep = checkIsStep(highlight);
  const isCurrentTeam = currentStepTeam === figureTeam;
  if (isStep) return 'filled';
  if (isCurrentTeam) return 'currentTeam';
};

export const getFigureSvgName = (figure: IFigureSvgData): FigureSvgNameType =>
  `${figure.type}_${figure.team}`;

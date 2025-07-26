import { IFigureSvgData } from '@/entities/Cell/types';
import { FigureSvgNameType } from '@/entities/Figure/Figure';

export const getFigureSvgName = (figure: IFigureSvgData): FigureSvgNameType =>
  `${figure.type}_${figure.team}`;

import { FigureTeam } from '@/entities/Cell/enums';
import { FigureAsPlainObjectType } from '@/entities/Figure/Figure';

import { FEN_FIGURE_NOTATION } from './data';

export const getFENFigureNotation = (figure: FigureAsPlainObjectType) => {
  const result = `${FEN_FIGURE_NOTATION[figure.type]}`;
  if (figure.team === FigureTeam.WHITE) {
    return result.toUpperCase();
  }
  return result;
};

import { FigureTeam } from '@/entities/Cell/enums';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import Logger from '@/services/Logger';
import getCastlingSteps, {
  CastlingType,
} from '@/services/stepsController/handlers/king/getCastlingSteps';
import { getKing } from '@/store/slices/cells/utils/helpers';

const getCastlingsFEN = (cells: ICellAsPlainObject[]) => {
  let result = '';

  const whiteCastlingSteps = getCastlingSteps(cells, getKing(cells, FigureTeam.WHITE)!);
  const blackCastlingSteps = getCastlingSteps(cells, getKing(cells, FigureTeam.BLACK)!);

  if (!whiteCastlingSteps.length && !blackCastlingSteps.length) return '-';

  whiteCastlingSteps
    .sort((step) => -Number(step.castling?.type === CastlingType.SHORT))
    .forEach((step) => {
      if (step.castling?.type === CastlingType.SHORT) result += 'K';
      else result += 'Q';
    });

  blackCastlingSteps
    .sort((step) => -Number(step.castling?.type === CastlingType.SHORT))
    .forEach((step) => {
      if (step.castling?.type === CastlingType.SHORT) result += 'k';
      else result += 'q';
    });

  return result;
};

export default getCastlingsFEN;

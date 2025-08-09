import { FigureTeam } from '@/entities/Cell/enums';
import { ICellAsPlainObject } from '@/entities/Cell/types';
import getCastlingsFEN from '@/store/slices/cells/utils/makeFEN/getCastlingsFEN';
import { getFENFiguresPositions } from '@/store/slices/cells/utils/makeFEN/getFENFiguresPositions';

import getEnPassantFEN from './getEnPassantFEN';

interface IMakeFEN {
  cells: ICellAsPlainObject[];
  currentTeam: FigureTeam;
  fullmoveNumber: number;
  fiftyStepsRuleCount: number;
}

// <позиция фигур> <активный цвет> <рокировки> <битое поле> <счётчик полуходов> <номер хода>

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

const makeFEN = ({
  currentTeam,
  fullmoveNumber,
  fiftyStepsRuleCount,
  cells,
}: IMakeFEN) => {
  const castlingsFEN = getCastlingsFEN(cells);
  const FENActiveTeam = currentTeam[0];

  return `${getFENFiguresPositions(
    cells,
  )} ${FENActiveTeam} ${castlingsFEN} ${getEnPassantFEN(
    cells,
  )} ${fiftyStepsRuleCount} ${fullmoveNumber}`;
};

export default makeFEN;

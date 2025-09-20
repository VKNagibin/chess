import { FigureTeam } from '@/entities/Cell/enums';
import { ICell } from '@/entities/Cell/types';
import getCastlingsFEN from '@/store/slices/cells/utils/makeFEN/getCastlingsFEN';
import { getFENFiguresPositions } from '@/store/slices/cells/utils/makeFEN/getFENFiguresPositions';

import getEnPassantFEN from './getEnPassantFEN';

interface IMakeFEN {
  cells: ICell[];
  activeTeam: FigureTeam;
  fullmoveNumber: number;
  fiftyStepsRuleCount: number;
}

// <позиция фигур> <активный цвет> <рокировки> <битое поле> <счётчик полуходов> <номер хода>

// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1

const makeFEN = ({
  activeTeam,
  fullmoveNumber,
  fiftyStepsRuleCount,
  cells,
}: IMakeFEN) => {
  const FENActiveTeam = activeTeam[0];

  return `${getFENFiguresPositions(cells)} ${FENActiveTeam} ${getCastlingsFEN(
    cells,
  )} ${getEnPassantFEN(cells)} ${fiftyStepsRuleCount} ${fullmoveNumber}`;
};

export default makeFEN;

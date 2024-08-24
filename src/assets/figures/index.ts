import bishop_black from '_img/figures/bishop_black.svg';
import bishop_white from '_img/figures/bishop_white.svg';
import king_black from '_img/figures/king_black.svg';
import king_white from '_img/figures/king_white.svg';
import knight_black from '_img/figures/knight_black.svg';
import knight_white from '_img/figures/knight_white.svg';
import pawn_black from '_img/figures/pawn_black.svg';
import pawn_white from '_img/figures/pawn_white.svg';
import queen_black from '_img/figures/queen_black.svg';
import queen_white from '_img/figures/queen_white.svg';
import rook_black from '_img/figures/rook_black.svg';
import rook_white from '_img/figures/rook_white.svg';

import { FigureTeam, FigureType } from '@/entities/Cell/enums';

export type FigureSvgNameType = `${FigureType}_${FigureTeam}`;

const figuresSvg: Record<FigureSvgNameType, string> = {
  bishop_black,
  pawn_white,
  queen_black,
  queen_white,
  rook_black,
  rook_white,
  bishop_white,
  king_black,
  king_white,
  knight_black,
  knight_white,
  pawn_black,
};

export default figuresSvg;

import { FigureTeam, FigureType } from '@/entities/Cell/enums';

import bishop_black from './bishop_black.svg';
import bishop_white from './bishop_white.svg';
import king_black from './king_black.svg';
import king_white from './king_white.svg';
import knight_black from './knight_black.svg';
import knight_white from './knight_white.svg';
import pawn_black from './pawn_black.svg';
import pawn_white from './pawn_white.svg';
import queen_black from './queen_black.svg';
import queen_white from './queen_white.svg';
import rook_black from './rook_black.svg';
import rook_white from './rook_white.svg';

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

import { FigureType } from '@/entities/Cell/enums';

export const FEN_FIGURE_NOTATION = {
  [FigureType.ROOK]: 'r',
  [FigureType.KNIGHT]: 'n',
  [FigureType.BISHOP]: 'b',
  [FigureType.QUEEN]: 'q',
  [FigureType.KING]: 'k',
  [FigureType.PAWN]: 'p',
} as const;

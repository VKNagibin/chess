import { FigureTeam, FigureType } from '@/enums';

export type BoardConfigsItemType = { cellIds: string[]; figure: FigureType };

export const figuresPlacesConfig: Record<FigureTeam, BoardConfigsItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellIds: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
      figure: FigureType.PAWN,
    },
    {
      cellIds: ['a8', 'h8'],
      figure: FigureType.ROOK,
    },
    {
      cellIds: ['b8', 'g8'],
      figure: FigureType.KNIGHT,
    },
    {
      cellIds: ['c8', 'f8'],
      figure: FigureType.BISHOP,
    },
    {
      cellIds: ['d8'],
      figure: FigureType.QUEEN,
    },
    {
      cellIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
      figure: FigureType.PAWN,
    },
    {
      cellIds: ['a1', 'h1'],
      figure: FigureType.ROOK,
    },
    {
      cellIds: ['b1', 'g1'],
      figure: FigureType.KNIGHT,
    },
    {
      cellIds: ['c1', 'f1'],
      figure: FigureType.BISHOP,
    },
    {
      cellIds: ['d1'],
      figure: FigureType.QUEEN,
    },
    {
      cellIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

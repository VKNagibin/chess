import { FigureTeam, FigureType } from '@/entities/Cell/enums';

import { CharValueType, NumberValueType } from '../../entities/Cell/types';

export type ConfigItemType = {
  cellsIds: `${CharValueType}${NumberValueType}`[];
  figure: FigureType;
};

export const teamsConfigs: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['a7', 'b7', 'c7', 'd7', 'e7', 'f7', 'g7', 'h7'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['a8', 'h8'],
      figure: FigureType.ROOK,
    },
    {
      cellsIds: ['b8', 'g8'],
      figure: FigureType.KNIGHT,
    },
    {
      cellsIds: ['c8', 'f8'],
      figure: FigureType.BISHOP,
    },
    {
      cellsIds: ['d8'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['a2', 'b2', 'c2', 'd2', 'e2', 'f2', 'g2', 'h2'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['a1', 'h1'],
      figure: FigureType.ROOK,
    },
    {
      cellsIds: ['b1', 'g1'],
      figure: FigureType.KNIGHT,
    },
    {
      cellsIds: ['c1', 'f1'],
      figure: FigureType.BISHOP,
    },
    {
      cellsIds: ['d1'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

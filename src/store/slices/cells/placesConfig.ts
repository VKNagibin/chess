import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { CharValueType, NumberValueType } from '@/entities/Cell/types';

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

export const kingFinishConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['h8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['g8', 'h7'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['f5'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

export const enPassantConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['f4'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['h8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['e2'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

export const shortCastlingConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['h1'],
      figure: FigureType.ROOK,
    },
  ],
};

export const longCastlingConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['a1'],
      figure: FigureType.ROOK,
    },
  ],
};

export const сastlingKingUnderAttackConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['e6'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['g2'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['a1'],
      figure: FigureType.ROOK,
    },
  ],
};

export const сastlingRookUnderAttackConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['e6'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['f8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['g2', 'b1'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['a1'],
      figure: FigureType.ROOK,
    },
  ],
};

export const gameOverStepConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['f8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['a7', 'b6'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

export const pawnMutateConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['f8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['c7'],
      figure: FigureType.PAWN,
    },
    {
      cellsIds: ['d1'],
      figure: FigureType.ROOK,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

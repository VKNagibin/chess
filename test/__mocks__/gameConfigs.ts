import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { ConfigItemType } from '@/store/slices/cells/placesConfig';

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

export const castlingsConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['f6'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['a8', 'h8'],
      figure: FigureType.ROOK,
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
      cellsIds: ['a1', 'h1'],
      figure: FigureType.ROOK,
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
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

export const gameOverStepConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['h8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['f5', 'g8', 'h7'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['e1'],
      figure: FigureType.KING,
    },
  ],
};

export const highlightsConfig: Record<FigureTeam, ConfigItemType[]> = {
  [FigureTeam.BLACK]: [
    {
      cellsIds: ['e8'],
      figure: FigureType.KING,
    },
  ],
  [FigureTeam.WHITE]: [
    {
      cellsIds: ['e2'],
      figure: FigureType.KING,
    },
    {
      cellsIds: ['e4'],
      figure: FigureType.BISHOP,
    },
    {
      cellsIds: ['d4'],
      figure: FigureType.QUEEN,
    },
    {
      cellsIds: ['c6'],
      figure: FigureType.ROOK,
    },
  ],
};

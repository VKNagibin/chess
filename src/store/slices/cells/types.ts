import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import type { ICastling, ICell } from '@/entities/Cell/types';
import type { CellIdType } from '@/entities/Cell/types';

export interface IStep {
  cellId: CellIdType;
  highlight: HighlightType;
  enPassantCellId?: CellIdType;
  castling?: ICastling;
}

export interface ISelectedFigureForMutate {
  type: FigureType;
  cellId: CellIdType;
}

export interface ICellFocusHandler {
  cellId: CellIdType;
  currentStepTeam: FigureTeam;
}

export interface StepDataInterface {
  currentCell: ICell;
  cells: ICell[];
  stepOwner?: ICell;
  ignoreCastling?: boolean;
}

export enum DifficultyLevels {
  BEGINNER = 'beginner',
  MEDIUM = 'medium',
  INTERMEDIATE = 'intermediate',
  GRANDMASTER = 'grandmaster',
}

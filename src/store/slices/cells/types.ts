import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import type { ICastling, ICellAsPlainObject } from '@/entities/Cell/types';
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
  currentCell: ICellAsPlainObject;
  cells: ICellAsPlainObject[];
  stepOwner?: ICellAsPlainObject;
  ignoreCastling?: boolean;
}

import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import { ICastling } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';

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

1;

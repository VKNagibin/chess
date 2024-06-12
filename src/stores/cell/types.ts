import { ICastling } from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';

export interface IStep {
  cellId: CellIdType;
  highlight: HighlightType;
  enPassantCellId?: CellIdType;
  castling?: ICastling;
}

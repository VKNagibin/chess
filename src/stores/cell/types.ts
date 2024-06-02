import Cell from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';

export interface IAdditionalStep {
  cellId: CellIdType;
  highlight: HighlightType;
  owner: Cell;
}

export interface IStep {
  cellId: CellIdType;
  highlight: HighlightType;
  enPassantCellId?: CellIdType;
  additionalStep?: IAdditionalStep;
}

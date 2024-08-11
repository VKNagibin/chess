import { CellColor, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';

export interface ICastling {
  targetCellId: CellIdType;
  dependent: {
    ownerCell: Cell;
    targetCell: Cell;
  };
}

class Cell {
  enPassantCellId: CellIdType | null = null;
  castling: ICastling[] = [];
  hiddenFigure = false;
  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
  isOver = false;

  constructor(public id: CellIdType, public color: CellColor) {}
}

export default Cell;

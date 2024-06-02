import { CellColor, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';

class Cell {
  enPassantCellId: CellIdType | null = null;
  hiddenFigure = false;
  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
  isOver = false;

  constructor(public id: CellIdType, public color: CellColor) {}
}

export default Cell;

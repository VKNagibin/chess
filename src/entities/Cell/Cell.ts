import { CellColor, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';

class Cell {
  constructor(public id: CellIdType, public color: CellColor) {}

  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
}

export default Cell;

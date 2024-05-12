import { CellColor, HighlightType } from '@/enums';

import Figure from './Figure';

class Cell {
  constructor(public id: string, public color: CellColor) {}

  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
}

export default Cell;

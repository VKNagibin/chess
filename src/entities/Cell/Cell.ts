import { CellColor, HighlightType } from '@/entities/Cell/enums';
import {
  CellIdType,
  ICastling,
  IFigureActionAnimationConfig,
} from '@/entities/Cell/types';
import Figure from '@/entities/Figure';
import { RectangularCoordinates } from '@/shared/types';

class Cell {
  enPassantCellId: CellIdType | null = null;
  castling: ICastling[] = [];
  coordinates!: RectangularCoordinates;
  hiddenFigure = false;
  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
  isOver = false;
  animationConfig: IFigureActionAnimationConfig | null = null;

  constructor(public id: CellIdType, public color: CellColor) {}

  setCoordinates = (x: number, y: number) => {
    this.coordinates = [x, y];
  };
}

export default Cell;

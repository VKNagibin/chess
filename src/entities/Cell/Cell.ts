import { CellColor, HighlightType } from '@/entities/Cell/enums';
import {
  CellIdType,
  ICastling,
  ICellAsPlainObject,
  IFigureActionAnimationConfig,
} from '@/entities/Cell/types';
import Figure from '@/entities/Figure';
import { RectangularCoordinatesType } from '@/shared/types';

class Cell {
  enPassantCellId: CellIdType | null = null;
  castling: ICastling[] = [];
  coordinates: RectangularCoordinatesType | null = null;
  hiddenFigure = false;
  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
  isOver = false;
  animationConfig: IFigureActionAnimationConfig | null = null;

  constructor(public id: CellIdType, public color: CellColor) {}

  toPlainObject = (): ICellAsPlainObject => ({
    id: this.id,
    color: this.color,
    enPassantCellId: this.enPassantCellId,
    castling: this.castling,
    coordinates: this.coordinates,
    hiddenFigure: this.hiddenFigure,
    highlight: this.highlight,
    figure: this.figure?.toPlainObject() || null,
    isOver: this.isOver,
    animationConfig: this.animationConfig,
  });
}

export default Cell;

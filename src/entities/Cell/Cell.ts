import { CellColor, FigureTeam, HighlightType } from '@/entities/Cell/enums';
import {
  CellIdType,
  ICastling,
  ICell,
  IFigureAnimationConfig,
} from '@/entities/Cell/types';
import Figure from '@/entities/Figure/Figure';
import { RectangularCoordinatesType } from '@/shared/types';

class Cell {
  enPassantCellId: CellIdType | null = null;
  castling: ICastling[] = [];
  coordinates: RectangularCoordinatesType | null = null;
  hiddenFigure = false;
  highlight: HighlightType = HighlightType.NONE;
  figure: Figure | null = null;
  animationConfig: IFigureAnimationConfig[] = [];

  constructor(
    public id: CellIdType,
    public color: CellColor,
  ) {}

  toPlainObject = (): ICell => ({
    id: this.id,
    color: this.color,
    enPassantCellId: this.enPassantCellId,
    castling: this.castling,
    coordinates: this.coordinates,
    hiddenFigure: this.hiddenFigure,
    highlight: this.highlight,
    figure: this.figure?.toPlainObject() || null,
    animationConfig: this.animationConfig,
  });
}

export default Cell;

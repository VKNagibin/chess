import Cell from '@/entities/Cell/Cell';
import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';
import { FigureAsPlainObjectType, FigureSvgNameType } from '@/entities/Figure';
import { RectangularCoordinatesType } from '@/shared/types';

export interface ICellAsPlainObject
  extends Pick<
    Cell,
    | 'id'
    | 'color'
    | 'enPassantCellId'
    | 'castling'
    | 'coordinates'
    | 'hiddenFigure'
    | 'highlight'
    | 'isOver'
    | 'animationConfig'
  > {
  figure: FigureAsPlainObjectType | null;
}

export type CharValueType = (typeof CELL_CHAR)[keyof typeof CELL_CHAR];
export type NumberValueType = (typeof CELL_NUMBER)[keyof typeof CELL_NUMBER];

export type CellIdType = `${CharValueType}${NumberValueType}`;

export interface ICastling {
  targetCellId: CellIdType;
  dependent: {
    ownerCell: ICellAsPlainObject;
    targetCell: ICellAsPlainObject;
  };
}

export enum AnimationActionType {
  DEAD = 'dead',
  MOVE = 'move',
  HIDE = 'hide',
}

export interface IFigureActionAnimationConfig {
  figureName?: FigureSvgNameType;
  action: AnimationActionType;
  coordinates?: RectangularCoordinatesType | null;
}

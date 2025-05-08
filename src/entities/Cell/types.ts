import { FigureSvgNameType } from '@img/figures';

import Cell from '@/entities/Cell/Cell';
import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';
import { RectangularCoordinates } from '@/shared/types';

export type CharValueType = (typeof CELL_CHAR)[keyof typeof CELL_CHAR];
export type NumberValueType = (typeof CELL_NUMBER)[keyof typeof CELL_NUMBER];

export type CellIdType = `${CharValueType}${NumberValueType}`;

export interface ICastling {
  targetCellId: CellIdType;
  dependent: {
    ownerCell: Cell;
    targetCell: Cell;
  };
}

export enum AnimationActionType {
  DEAD = 'dead',
  MOVE = 'move',
}

export interface IFigureActionAnimationConfig {
  actorIcon: FigureSvgNameType | null;
  action: AnimationActionType | null;
  coordinates?: RectangularCoordinates;
}

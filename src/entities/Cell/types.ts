import Cell from '@/entities/Cell/Cell';
import { CELL_CHAR, CELL_NUMBER } from '@/entities/Cell/constants';
import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { FigureAsPlainObjectType, FigureSvgNameType } from '@/entities/Figure/Figure';
import { RectangularCoordinatesType } from '@/shared/types';

export interface ICellAsPlainObject extends Omit<Cell, 'toPlainObject' | 'figure'> {
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
  KING_PULSATE = 'kingPulsate',
  KING_ENEMY_PULSATE = 'kingEnemyPulsate',
}

export interface IFigureAnimationConfig {
  id: string;
  figureName?: FigureSvgNameType;
  action: AnimationActionType;
  coordinates?: RectangularCoordinatesType | null;
}

export interface IFigureSvgData {
  type: FigureType;
  team: FigureTeam;
}

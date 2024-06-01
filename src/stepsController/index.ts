import Cell from '@/entities/Cell/Cell';
import { FigureType } from '@/entities/Cell/enums';
import handlePawnSteps from '@/stepsController/pawn';
import { IStep } from '@/stores/cell/types';

import handleKnightSteps from './knight';

const handlersByFigureTypeMap: Record<
  FigureType,
  (cells: Cell[], focusedCell: Cell) => IStep[]
> = {
  [FigureType.PAWN]: handlePawnSteps,
  [FigureType.KING]: () => {
    return [];
  },
  [FigureType.QUEEN]: () => {
    return [];
  },
  [FigureType.KNIGHT]: handleKnightSteps,
  [FigureType.BISHOP]: () => {
    return [];
  },
  [FigureType.ROOK]: () => {
    return [];
  },
};

export default handlersByFigureTypeMap;

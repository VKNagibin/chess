import Cell from '@/entities/Cell/Cell';
import { FigureType } from '@/entities/Cell/enums';
import handleBishopSteps from '@/stepsController/handlers/bishop';
import handleKingSteps from '@/stepsController/handlers/king';
import handleKnightSteps from '@/stepsController/handlers/knight';
import handlePawnSteps from '@/stepsController/handlers/pawn';
import handleQueenSteps from '@/stepsController/handlers/queen';
import handleRookSteps from '@/stepsController/handlers/rook';
import { IStep } from '@/stores/cell/types';

const handlersByFigureTypeMap: Record<
  FigureType,
  (cells: Cell[], focusedCell: Cell) => IStep[]
> = {
  [FigureType.PAWN]: handlePawnSteps,
  [FigureType.KING]: handleKingSteps,
  [FigureType.QUEEN]: handleQueenSteps,
  [FigureType.KNIGHT]: handleKnightSteps,
  [FigureType.BISHOP]: handleBishopSteps,
  [FigureType.ROOK]: handleRookSteps,
};

export default handlersByFigureTypeMap;

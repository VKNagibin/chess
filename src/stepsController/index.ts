import { FigureType } from '@/entities/Cell/enums';
import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import handleBishopSteps from '@/stepsController/handlers/bishop';
import handleKingSteps from '@/stepsController/handlers/king';
import handleKnightSteps from '@/stepsController/handlers/knight';
import handlePawnSteps from '@/stepsController/handlers/pawn';
import handleQueenSteps from '@/stepsController/handlers/queen';
import handleRookSteps from '@/stepsController/handlers/rook';

const handlersByFigureTypeMap: Record<
  FigureType,
  ({ cells, currentCell, ignoreCastling }: StepDataInterface) => IStep[]
> = {
  [FigureType.PAWN]: handlePawnSteps,
  [FigureType.KING]: handleKingSteps,
  [FigureType.QUEEN]: handleQueenSteps,
  [FigureType.KNIGHT]: handleKnightSteps,
  [FigureType.BISHOP]: handleBishopSteps,
  [FigureType.ROOK]: handleRookSteps,
};

export default handlersByFigureTypeMap;

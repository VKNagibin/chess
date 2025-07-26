import { FigureType } from '@/entities/Cell/enums';
import handleBishopSteps from '@/services/stepsController/handlers/bishop';
import handleKingSteps from '@/services/stepsController/handlers/king';
import handleKnightSteps from '@/services/stepsController/handlers/knight';
import handlePawnSteps from '@/services/stepsController/handlers/pawn';
import handleQueenSteps from '@/services/stepsController/handlers/queen';
import handleRookSteps from '@/services/stepsController/handlers/rook';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

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

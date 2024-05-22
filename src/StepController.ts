import Board from '@/Board';
import Figure from '@/Figure';

import { FigureTeam, FigureType } from './enums';

const figuresTypesHandlersMap: Record<FigureType, () => void> = {
  [FigureType.PAWN]: () => {
    console.log();
  },
  [FigureType.KING]: () => {
    console.log();
  },
  [FigureType.QUEEN]: () => {
    console.log();
  },
  [FigureType.KNIGHT]: () => {
    console.log();
  },
  [FigureType.BISHOP]: () => {
    console.log();
  },
  [FigureType.ROOK]: () => {
    console.log();
  },
};

class StepController {
  board = Board.getBoard();

  getSteps(figure: Figure) {
    return figuresTypesHandlersMap[figure.type]();
  }

  // handlePawn(figure: Figure) {}
}

export default StepController;

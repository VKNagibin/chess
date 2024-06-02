import Cell from '@/entities/Cell/Cell';
import { FigureType, HighlightType } from '@/entities/Cell/enums';
import Figure from '@/entities/Figure';
import handlePawnStep from '@/stores/cell/utils/handlePawnStep';
import { resetCellsHighlight } from '@/stores/cell/utils/utils';

interface IBoardState {
  cells: Cell[];
  currentFigure: Figure;
}

export default function (
  currentCell: Cell,
  cells: Cell[],
  stepOwner?: Cell,
): IBoardState {
  const stepOwnerCell =
    stepOwner || cells.find((cell) => cell.highlight === HighlightType.SELECTED)!;
  if (!stepOwnerCell) throw new Error('Ups...Something went wrong...');
  const currentFigure = stepOwnerCell.figure!;
  const stepsWithoutHighlight = resetCellsHighlight(cells);

  let afterStepCellsState: Cell[];

  if (currentFigure.type === FigureType.PAWN)
    afterStepCellsState = handlePawnStep(stepOwnerCell, currentCell, cells);
  else
    afterStepCellsState = stepsWithoutHighlight.map((cell) => {
      if (cell.hiddenFigure) {
        cell.hiddenFigure = false;
        cell.figure = null;
      }
      if (cell.id === currentCell.id) return { ...cell, figure: currentFigure };
      if (cell.id === stepOwnerCell!.id) return { ...cell, figure: null };
      return cell;
    });

  return { cells: afterStepCellsState, currentFigure };
}

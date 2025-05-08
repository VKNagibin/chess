import { FigureSvgNameType } from '@img/figures';

import Cell from '@/entities/Cell/Cell';
import { FigureType, HighlightType } from '@/entities/Cell/enums';
import { AnimationActionType } from '@/entities/Cell/types';
import Figure from '@/entities/Figure';
import handlePawnStep from '@/stores/cell/utils/handlePawnStep';
import { resetCellsHighlight } from '@/stores/cell/utils/helpers';

interface IBoardState {
  cells: Cell[];
  stepOwnerCell: Cell;
  currentFigure: Figure;
}

export default function (
  currentCell: Cell,
  cells: Cell[],
  stepOwner?: Cell,
): IBoardState {
  const stepOwnerCell =
    stepOwner || cells.find((cell) => cell.highlight === HighlightType.SELECTED)!;
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
      // TODO рефакторинг для упрощения понимания

      if (cell.id === currentCell.id)
        return {
          ...cell,
          figure: currentFigure,
          animationConfig: {
            actorIcon: currentCell.figure
              ? (`${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType)
              : null,
            action: currentCell.figure ? AnimationActionType.DEAD : null,
          },
        };
      if (cell.id === stepOwnerCell!.id)
        return {
          ...cell,
          figure: null,
          animationConfig: {
            actorIcon:
              `${stepOwnerCell.figure?.type}_${stepOwnerCell.figure?.team}` as FigureSvgNameType,
            action: AnimationActionType.MOVE,
            coordinates: currentCell.coordinates,
          },
        };
      return cell;
    });

  return { cells: afterStepCellsState, stepOwnerCell, currentFigure };
}

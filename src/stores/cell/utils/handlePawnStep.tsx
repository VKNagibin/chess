import { FigureSvgNameType } from '@img/figures';

import Cell from '@/entities/Cell/Cell';
import { AnimationActionType } from '@/entities/Cell/types';
import { resetCellsHighlight } from '@/stores/cell/utils/helpers';

export default function (stepOwner: Cell, currentCell: Cell, cells: Cell[]) {
  const cellsWithoutHighlight = resetCellsHighlight(cells);
  if (!currentCell.hiddenFigure)
    // TODO рефакторинг для упрощения понимания

    return cellsWithoutHighlight.map((cell) => {
      if (currentCell.enPassantCellId === cell.id) {
        return { ...cell, figure: stepOwner.figure, hiddenFigure: true };
      }
      if (cell.hiddenFigure)
        return {
          ...cell,
          hiddenFigure: false,
          figure: null,
        };

      if (cell.id === currentCell.id)
        return {
          ...cell,
          figure: stepOwner.figure,
          animationConfig: {
            actorIcon: currentCell.figure
              ? (`${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType)
              : null,
            action: currentCell.figure ? AnimationActionType.DEAD : null,
          },
        };
      if (cell.id === stepOwner.id)
        return {
          ...cell,
          figure: null,
          animationConfig: {
            actorIcon:
              `${stepOwner.figure?.type}_${stepOwner.figure?.team}` as FigureSvgNameType,
            action: AnimationActionType.MOVE,
            coordinates: currentCell.coordinates,
          },
        };
      return cell;
    });

  const sourceCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  return cellsWithoutHighlight.map((cell) => {
    if (cell.id === sourceCell?.id) return { ...cell, figure: null };
    if (cell.id === currentCell.id)
      return {
        ...cell,
        figure: stepOwner.figure,
        hiddenFigure: false,
        animationConfig: {
          actorIcon: currentCell.figure
            ? (`${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType)
            : null,
          action: currentCell.figure ? AnimationActionType.DEAD : null,
        },
      };
    if (stepOwner.id === cell.id) {
      return {
        ...cell,
        figure: null,
        animationConfig: {
          actorIcon:
            `${stepOwner.figure?.type}_${stepOwner.figure?.team}` as FigureSvgNameType,
          action: AnimationActionType.MOVE,
          coordinates: currentCell.coordinates,
        },
      };
    }
    return cell;
  });
}

import { AnimationActionType } from '@/entities/Cell/types';
import { FigureSvgNameType } from '@/entities/Figure';

import { StepDataInterface } from '../types';

export default function ({ stepOwner, currentCell, cells }: StepDataInterface): void {
  if (!currentCell.hiddenFigure) {
    cells.forEach((cell) => {
      if (cell.id === currentCell.id && currentCell.figure) {
        cell.animationConfig = {
          figureName:
            `${currentCell.figure.type}_${currentCell.figure.team}` as FigureSvgNameType,
          action: AnimationActionType.DEAD,
        };

        cell.figure = stepOwner?.figure || null;
        return;
      }

      if (cell.id === currentCell.id) {
        cell.animationConfig = {
          action: AnimationActionType.HIDE,
        };

        cell.figure = stepOwner?.figure || null;

        return;
      }

      if (cell.id === stepOwner?.id && stepOwner.figure) {
        cell.animationConfig = {
          figureName:
            `${stepOwner.figure.type}_${stepOwner.figure.team}` as FigureSvgNameType,
          action: AnimationActionType.MOVE,
          coordinates: currentCell.coordinates,
        };

        cell.figure = null;
        return;
      }

      if (cell.id === stepOwner?.id) {
        cell.figure = null;
        return;
      }

      if (currentCell.enPassantCellId === cell.id) {
        cell.figure = stepOwner?.figure || null;
        cell.hiddenFigure = true;
        return;
      }

      if (cell.hiddenFigure) {
        cell.hiddenFigure = false;
        cell.figure = null;
        return;
      }
    });

    return;
  }

  const sourceCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  cells.forEach((cell) => {
    if (cell.id === sourceCell?.id) {
      cell.figure = null;
      return;
    }
    if (cell.id === currentCell.id) {
      cell.figure = stepOwner?.figure || null;
      cell.hiddenFigure = false;
      cell.animationConfig = {
        figureName: currentCell.figure
          ? (`${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType)
          : null,
        action: currentCell.figure ? AnimationActionType.DEAD : null,
      };
      return;
    }

    if (stepOwner?.id === cell.id) {
      cell.figure = null;
      cell.animationConfig = {
        figureName:
          `${stepOwner.figure?.type}_${stepOwner.figure?.team}` as FigureSvgNameType,
        action: AnimationActionType.MOVE,
        coordinates: currentCell.coordinates,
      };
      return;
    }
  });
}

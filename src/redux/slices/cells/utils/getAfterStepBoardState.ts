import { HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { AnimationActionType } from '@/entities/Cell/types';
import type { FigureSvgNameType } from '@/entities/Figure';

import { StepDataInterface } from '../types';

type PartialCellFieldsType = Partial<ICellAsPlainObject>;

interface IAfterStepBoardState {
  afterStepBoardState: ICellAsPlainObject[];
  stepOwnerCell?: ICellAsPlainObject;
  changedAfterStepCells: PartialCellFieldsType[];
}

export default function ({
  currentCell,
  cells,
  stepOwner,
}: StepDataInterface): IAfterStepBoardState {
  const stepOwnerCell =
    stepOwner || cells.find((cell) => cell.highlight === HighlightType.SELECTED);

  const stepOwnerFigure = stepOwnerCell?.figure || null;

  const changedAfterStepCells = cells
    .filter((cell) => {
      if (cell.hiddenFigure) return true;
      if (cell.id === currentCell.id) return true;
      return cell.id === stepOwnerCell?.id;
    })
    .map((cell) => {
      const changedCellFields: PartialCellFieldsType = {};

      if (cell.hiddenFigure) {
        changedCellFields.hiddenFigure = false;
        changedCellFields.figure = null;
      }

      if (cell.id === currentCell.id && currentCell.figure) {
        changedCellFields.figure = stepOwnerFigure || null;
        changedCellFields.animationConfig = {
          figureName:
            `${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType,
          action: AnimationActionType.DEAD,
        };

        return { id: cell.id, ...changedCellFields };
      }

      if (cell.id === currentCell.id) {
        changedCellFields.figure = stepOwnerFigure || null;
        changedCellFields.animationConfig = {
          action: AnimationActionType.HIDE,
        };

        return { id: cell.id, ...changedCellFields };
      }

      if (cell.id === stepOwnerCell?.id && stepOwnerFigure) {
        changedCellFields.animationConfig = {
          figureName:
            `${stepOwnerFigure.type}_${stepOwnerFigure.team}` as FigureSvgNameType,
          action: AnimationActionType.MOVE,
          coordinates: currentCell.coordinates,
        };
        changedCellFields.figure = null;
        return { id: cell.id, ...changedCellFields };
      }

      return {
        id: cell.id,
        ...changedCellFields,
      };
    });

  const afterStepBoardState = cells.map((cell) => {
    const currentChangedCell = changedAfterStepCells.find(
      (changedCell) => cell.id === changedCell.id,
    );
    if (!currentChangedCell) return cell;
    return {
      ...cell,
      ...currentChangedCell,
    };
  });

  // const sourceCell = cells.find(
  //   (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  // );

  // afterStepsCells = cells.map((cell) => {
  //   if (cell.id === sourceCell?.id) {
  //     cell.figure = null;
  //     return cell;
  //   }

  //   if (cell.id === currentCell.id && currentCell.figure) {
  //     cell.animationConfig = {
  //       figureName:
  //         `${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType,
  //       action: AnimationActionType.DEAD,
  //     };
  //     cell.hiddenFigure = false;
  //     cell.figure = stepOwnerFigure || null;
  //     return cell;
  //   }

  //   if (stepOwner?.id === cell.id) {
  //     cell.figure = null;
  //     cell.animationConfig = {
  //       figureName:
  //         `${stepOwner.figure?.type}_${stepOwner.figure?.team}` as FigureSvgNameType,
  //       action: AnimationActionType.MOVE,
  //       coordinates: currentCell.coordinates,
  //     };
  //     return;
  //   }
  // });

  return { afterStepBoardState, changedAfterStepCells, stepOwnerCell };
}

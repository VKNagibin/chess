import { HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { AnimationActionType } from '@/entities/Cell/types';
import type { FigureSvgNameType } from '@/entities/Figure/Figure';
import { uniqId } from '@/shared/utils/uniqId';

import { StepDataInterface } from '../../types';

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
  const sourceCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  const changedAfterStepCells = cells
    .filter((cell) => {
      if (cell.id === currentCell.id && cell.id === stepOwnerCell?.id) return false;
      if (cell.hiddenFigure) return true;
      if (cell.id === currentCell.id) return true;
      if (currentCell.enPassantCellId === cell.id) return true;
      if (cell.id === sourceCell?.id) return true;
      return cell.id === stepOwnerCell?.id;
    })
    .map((cell) => {
      const changedCellFields: PartialCellFieldsType = {};

      if (cell.id === sourceCell?.id) changedCellFields.figure = null;

      if (currentCell.enPassantCellId === cell.id) {
        changedCellFields.figure = stepOwnerCell?.figure || null;
        changedCellFields.hiddenFigure = true;
      }

      if (cell.hiddenFigure) {
        changedCellFields.hiddenFigure = false;
        changedCellFields.figure = null;
      }

      if (cell.id === currentCell.id && currentCell.figure) {
        changedCellFields.figure = stepOwnerFigure || null;
        changedCellFields.hiddenFigure = false;
        changedCellFields.animationConfig = {
          id: uniqId(),
          figureName:
            `${currentCell.figure?.type}_${currentCell.figure?.team}` as FigureSvgNameType,
          action: AnimationActionType.DEAD,
        };

        return { id: cell.id, ...changedCellFields };
      }

      if (cell.id === currentCell.id) {
        changedCellFields.figure = stepOwnerFigure || null;
        changedCellFields.animationConfig = {
          id: uniqId(),
          action: AnimationActionType.HIDE,
        };

        return { id: cell.id, ...changedCellFields };
      }

      if (cell.id === stepOwnerCell?.id && stepOwnerFigure) {
        changedCellFields.animationConfig = {
          id: uniqId(),
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

  return { afterStepBoardState, changedAfterStepCells, stepOwnerCell };
}

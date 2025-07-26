import {
  cellNumbersForPawnMutateList,
  PawnMutateCellNumbersType,
} from '@/entities/Cell/constants';
import { FigureType } from '@/entities/Cell/enums';
import { ICellAsPlainObject } from '@/entities/Cell/types';

const getPawnForMutation = (
  cells: ICellAsPlainObject[],
): ICellAsPlainObject | undefined =>
  cells.find((cell) => {
    if (cell.figure?.type !== FigureType.PAWN) return;
    return cellNumbersForPawnMutateList.includes(cell.id[1] as PawnMutateCellNumbersType);
  });

export const updateBoardState = (
  cells: ICellAsPlainObject[],
  changedAfterStepCells: Partial<ICellAsPlainObject>[],
) => {
  cells.forEach((cell) => {
    const currentChangedCell = changedAfterStepCells.find(
      (changedCell) => cell.id === changedCell.id,
    );
    if (!currentChangedCell) return;
    for (const key in currentChangedCell) {
      // @ts-ignore
      cell[key] = currentChangedCell[key];
    }
  });

  const pawnForMutation = getPawnForMutation(cells);

  cells.forEach((cell, index) => {
    if (index === 0 && !pawnForMutation) cell.allowNextStep = true;
    if (cell.id === pawnForMutation?.id) {
      cell.allowPawnMutation = true;
    }
  });
};

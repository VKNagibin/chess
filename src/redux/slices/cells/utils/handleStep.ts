import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import getAfterStepBoardState from '@/redux/slices/cells/utils/getAfterStepBoardState';
import getKingEnemies from '@/redux/slices/cells/utils/getKingEnemies';
import getOurKingAttackResult from '@/redux/slices/cells/utils/getOurKingAttackResult';
import {
  checkIsKing,
  getEnemyTeam,
  resetCellsHighlight,
} from '@/redux/slices/cells/utils/helpers';

import type { StepDataInterface } from '../types';

const clearCastling = (cells: ICellAsPlainObject[]) => {
  cells.forEach((cell) => {
    cell.castling = [];
  });
};

function getKing(cells: ICellAsPlainObject[], team: FigureTeam) {
  return cells.find((cell) => cell.figure?.team === team && checkIsKing(cell));
}

export function handleStep({ currentCell, cells }: StepDataInterface): void {
  const { afterStepBoardState, changedAfterStepCells, stepOwnerCell } =
    getAfterStepBoardState({
      currentCell,
      cells,
    });
  resetCellsHighlight(cells);

  const stepOwnerFigure = stepOwnerCell?.figure || null;

  const currentTeam = stepOwnerFigure?.team;
  if (!currentTeam) return;

  const ourKing = getKing(afterStepBoardState, currentTeam);
  const theirKing = getKing(afterStepBoardState, getEnemyTeam(currentTeam));
  const ourKingEnemies = getKingEnemies(afterStepBoardState, currentTeam);
  const theirKingEnemies = getKingEnemies(afterStepBoardState, getEnemyTeam(currentTeam));

  if (!ourKing?.figure || !theirKing?.figure)
    throw new Error('Critical error: king not detected');

  if (ourKingEnemies.length) {
    return;
  }

  ourKing.figure!.isUnderAttack = false;

  if (theirKingEnemies.length) {
    getOurKingAttackResult({
      king: theirKing,
      team: getEnemyTeam(currentTeam),
      cells,
    });
    cells.forEach((cell) => {
      const currentChangedCell = changedAfterStepCells.find(
        (changedCell) => cell.id === changedCell.id,
      );
      if (!currentChangedCell) return;
      for (const key in currentChangedCell) {
        cell[key] = currentChangedCell[key as CellAsPlainObjectKeysType];
      }
    });
    return;
  } else theirKing.figure!.isUnderAttack = false;

  stepOwnerFigure.isFirstStep = false;
  const castlingStep = stepOwnerCell?.castling.find(
    (cell) => cell.targetCellId === currentCell.id,
  );

  if (castlingStep) {
    const {
      afterStepBoardState: afterCastlingBoardState,
      changedAfterStepCells: castlingChangedAfterStepCells,
    } = getAfterStepBoardState({
      currentCell: castlingStep.dependent.targetCell,
      cells: afterStepBoardState,
      stepOwner: castlingStep.dependent.ownerCell,
    });
    clearCastling(afterCastlingBoardState);
    cells.forEach((cell) => {
      const currentChangedCell = castlingChangedAfterStepCells.find(
        (changedCell) => cell.id === changedCell.id,
      );
      if (!currentChangedCell) return;
      for (const key in currentChangedCell) {
        cell[key] = currentChangedCell[key as CellAsPlainObjectKeysType];
      }
    });
  }

  clearCastling(afterStepBoardState);
  cells.forEach((cell) => {
    const currentChangedCell = changedAfterStepCells.find(
      (changedCell) => cell.id === changedCell.id,
    );
    if (!currentChangedCell) return;
    for (const key in currentChangedCell) {
      cell[key] = currentChangedCell[key as CellAsPlainObjectKeysType];
    }
  });
}

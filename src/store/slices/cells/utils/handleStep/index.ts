import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { type ICellAsPlainObject, AnimationActionType } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { uniqId } from '@/shared/utils/uniqId';
import getAfterStepBoardState from '@/store/slices/cells/utils/handleStep/getAfterStepBoardState';
import getKingAttackResult from '@/store/slices/cells/utils/handleStep/getKingAttackResult';
import getKingEnemies from '@/store/slices/cells/utils/handleStep/getKingEnemies';
import {
  clearCastling,
  getKing,
  resetCellsHighlight,
} from '@/store/slices/cells/utils/helpers';

import { getEnemyTeam } from '../helpers';
import { updateBoardState } from './updateBoardState';

interface IHandleStepProps {
  currentCell: ICellAsPlainObject;
  cells: ICellAsPlainObject[];
  currentTeam: FigureTeam;
}

export function handleStep({ currentCell, cells, currentTeam }: IHandleStepProps): void {
  const { afterStepBoardState, changedAfterStepCells, stepOwnerCell } =
    getAfterStepBoardState({
      currentCell,
      cells,
    });

  resetCellsHighlight(cells);
  cells.forEach((cell) => {
    if (cell.animationConfig) cell.animationConfig = null;
    if (cell.allowNextStep) cell.allowNextStep = false;
    if (cell.allowPawnMutation) cell.allowPawnMutation = false;
  });

  const stepOwnerFigure = stepOwnerCell?.figure || null;

  const ourKing = getKing(afterStepBoardState, currentTeam);
  const theirKing = getKing(afterStepBoardState, getEnemyTeam(currentTeam));
  const ourKingEnemies = getKingEnemies(afterStepBoardState, currentTeam);
  const theirKingEnemies = getKingEnemies(afterStepBoardState, getEnemyTeam(currentTeam));

  if (ourKingEnemies.length) {
    ourKingEnemies.forEach((enemyCell) => {
      if (!enemyCell.figure) return;
      enemyCell.animationConfig = {
        id: uniqId(),
        action: AnimationActionType.KING_ENEMY_PULSATE,
        figureName: getFigureSvgName(enemyCell.figure),
      };
    });
    const king = getKing(cells, currentTeam);

    if (!king?.figure) return;
    king.animationConfig = {
      id: uniqId(),
      action: AnimationActionType.KING_PULSATE,
      figureName: getFigureSvgName(king.figure),
    };
    return;
  }

  ourKing!.figure!.isUnderAttack = false;

  if (theirKingEnemies.length) {
    getKingAttackResult({
      king: theirKing!,
      team: getEnemyTeam(currentTeam),
      cells: afterStepBoardState,
    });
    updateBoardState(cells, changedAfterStepCells);
    return;
  } else theirKing!.figure!.isUnderAttack = false;

  stepOwnerFigure!.isFirstStep = false;
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
    updateBoardState(cells, castlingChangedAfterStepCells);
    return;
  }

  clearCastling(afterStepBoardState);
  updateBoardState(cells, changedAfterStepCells);
}

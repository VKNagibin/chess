import {
  cellNumbersBoundaryValues,
  PawnMutateCellNumbersType,
} from '@/entities/Cell/constants';
import { FigureTeam, FigureType, HighlightType } from '@/entities/Cell/enums';
import type { CellIdType, ICellAsPlainObject } from '@/entities/Cell/types';
import { AnimationActionType } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { uniqId } from '@/shared/utils/uniqId';

import { StepDataInterface } from '../types';
import getKingAttackResult, { KingAttackResult } from './getKingAttackResult';
import getKingEnemies from './getKingEnemies';
import { getEnemyTeam, getKing } from './helpers';

type PartialCellFieldsType = Partial<ICellAsPlainObject>;

interface IAfterStepBoardState {
  updatedCells: ICellAsPlainObject[];
  deadKingTeam: FigureTeam | null;
  cellWithMutablePawnId: CellIdType | null;
  needResetFiftyStepsRule?: boolean;
  canChangeTeam?: boolean;
  canUpdateFullmoveNumber?: boolean;
}

const getPawnForMutation = (
  cells: ICellAsPlainObject[],
): ICellAsPlainObject | undefined =>
  cells.find((cell) => {
    if (cell.figure?.type !== FigureType.PAWN) return;
    return cellNumbersBoundaryValues.includes(cell.id[1] as PawnMutateCellNumbersType);
  });

function getAfterStepBoardState({
  currentCell,
  cells,
  stepOwner,
}: StepDataInterface): IAfterStepBoardState {
  const stepOwnerCell =
    stepOwner || cells.find((cell) => cell.highlight === HighlightType.SELECTED);

  const stepOwnerFigure = stepOwnerCell!.figure!;
  const canUpdateFullmoveNumber = stepOwnerFigure.team === FigureTeam.BLACK;

  const currentTeam = stepOwnerFigure.team;

  const sourceFigureCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  let needResetFiftyStepsRule = stepOwnerFigure.type === FigureType.PAWN;

  const afterStepBoardState = cells.map((cell) => {
    if (cell.id === currentCell.id && cell.id === stepOwnerCell?.id) return cell;

    const changedCellFields: PartialCellFieldsType = {};

    if (cell.id === sourceFigureCell?.id) changedCellFields.figure = null;

    if (currentCell.enPassantCellId === cell.id) {
      changedCellFields.figure = stepOwnerFigure;
      changedCellFields.hiddenFigure = true;
    }

    if (cell.hiddenFigure) {
      changedCellFields.hiddenFigure = false;
      changedCellFields.figure = null;
    }

    if (cell.id === currentCell.id && currentCell.figure) {
      changedCellFields.figure = stepOwnerFigure;
      changedCellFields.hiddenFigure = false;
      needResetFiftyStepsRule = true;
      changedCellFields.animationConfig = [
        {
          id: uniqId(),
          figureName: getFigureSvgName(currentCell.figure),
          action: AnimationActionType.DEAD,
        },
      ];

      return { ...cell, ...changedCellFields };
    }

    if (cell.id === currentCell.id) {
      changedCellFields.figure = stepOwnerFigure;
      changedCellFields.castling = stepOwnerCell?.castling;
      changedCellFields.animationConfig = [
        {
          id: uniqId(),
          action: AnimationActionType.HIDE,
        },
      ];

      return { ...cell, ...changedCellFields };
    }

    if (cell.id === stepOwnerCell?.id) {
      changedCellFields.animationConfig = [
        {
          id: uniqId(),
          figureName: getFigureSvgName(stepOwnerFigure),
          action: AnimationActionType.MOVE,
          coordinates: currentCell.coordinates,
        },
      ];
      changedCellFields.figure = null;
      return { ...cell, ...changedCellFields };
    }

    return {
      ...cell,
      ...changedCellFields,
    };
  });

  const pawnForMutation = getPawnForMutation(afterStepBoardState);

  if (pawnForMutation) {
    return {
      updatedCells: afterStepBoardState,
      deadKingTeam: null,
      cellWithMutablePawnId: pawnForMutation.id,
    };
  }

  const ourKing = getKing(afterStepBoardState, currentTeam)!;
  const theirKing = getKing(afterStepBoardState, getEnemyTeam(currentTeam))!;
  const ourKingEnemies = getKingEnemies(afterStepBoardState, currentTeam);
  const theirKingEnemies = getKingEnemies(afterStepBoardState, getEnemyTeam(currentTeam));

  if (ourKingEnemies.length) {
    const ourKingEnemiesIds = ourKingEnemies.map((cell) => cell.id);

    const ourKingBeforeStep = getKing(cells, currentTeam)!;

    const updatedCells = cells.map((cell) => {
      if (ourKingEnemiesIds.includes(cell.id)) {
        return {
          ...cell,
          animationConfig: [
            {
              id: uniqId(),
              action: AnimationActionType.KING_ENEMY_PULSATE,
              figureName: getFigureSvgName(cell.figure!),
            },
          ],
        };
      }

      if (cell.id === ourKingBeforeStep.id) {
        return {
          ...cell,
          animationConfig: [
            {
              id: uniqId(),
              action: AnimationActionType.KING_PULSATE,
              figureName: getFigureSvgName(ourKing.figure!),
            },
          ],
        };
      }
      return cell;
    });

    return {
      updatedCells,
      deadKingTeam: null,
      cellWithMutablePawnId: null,
    };
  }

  ourKing!.figure!.isUnderAttack = false;

  if (theirKingEnemies.length) {
    const result = getKingAttackResult({
      team: getEnemyTeam(currentTeam),
      cells: afterStepBoardState,
    });

    if (result === KingAttackResult.ALIVE) {
      theirKing.animationConfig = [
        {
          id: uniqId(),
          action: AnimationActionType.KING_PULSATE,
          figureName: getFigureSvgName(theirKing.figure!),
        },
      ];
      theirKing.figure!.isUnderAttack = true;
    }

    return {
      updatedCells: afterStepBoardState,
      canChangeTeam: true,
      canUpdateFullmoveNumber,
      needResetFiftyStepsRule,
      deadKingTeam: result === KingAttackResult.ALIVE ? null : getEnemyTeam(currentTeam),
      cellWithMutablePawnId: null,
    };
  }

  theirKing.figure!.isUnderAttack = false;

  const updatedStepOwner = afterStepBoardState.find((cell) => {
    return cell.id === currentCell!.id;
  });

  updatedStepOwner!.figure!.isFirstStep = false;

  const castlingStep = updatedStepOwner?.castling.find(
    (cell) => cell.targetCellId === currentCell.id,
  );

  if (castlingStep) {
    const result = getAfterStepBoardState({
      currentCell: castlingStep.dependent.targetCell,
      cells: afterStepBoardState,
      stepOwner: castlingStep.dependent.ownerCell,
    });

    return result;
  }

  return {
    updatedCells: afterStepBoardState,
    canUpdateFullmoveNumber,
    cellWithMutablePawnId: null,
    needResetFiftyStepsRule,
    canChangeTeam: true,
    deadKingTeam: null,
  };
}

export default getAfterStepBoardState;

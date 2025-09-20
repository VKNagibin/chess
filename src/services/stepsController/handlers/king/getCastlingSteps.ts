import { cellNumbersBoundaryValues } from '@/entities/Cell/constants';
import { FigureType } from '@/entities/Cell/enums';
import type { ICell, NumberValueType } from '@/entities/Cell/types';
import type { CellIdType } from '@/entities/Cell/types';
import getLongCastlingStep from '@/services/stepsController/handlers/king/getLongCastlingStep';
import getShortCastlingStep from '@/services/stepsController/handlers/king/getShortCastlingStep';
import { HandlerType } from '@/services/stepsController/types';
import { IStep } from '@/store/slices/cells/types';
import { getSteps } from '@/store/slices/cells/utils/helpers';

import { getLeftId, getRightId } from '../../utils';

export enum CastlingType {
  SHORT = 'short',
  LONG = 'long',
}

export interface ICastlingStep {
  kingCell: ICell;
  rookCell: ICell;
  cells: ICell[];
  enemiesStepsIds: CellIdType[];
  handleMove: HandlerType;
}

export const getCastlingType = (cellId: CellIdType) =>
  getLeftId(cellId) ? CastlingType.SHORT : CastlingType.LONG;

export default function (cells: ICell[], kingCell: ICell) {
  if (!kingCell.figure!.isFirstStep || kingCell.figure?.isUnderAttack) return [];
  if (!cellNumbersBoundaryValues.includes(kingCell.id[1] as NumberValueType)) return [];

  const team = kingCell.figure!.team;
  const rookCells = cells.filter(
    (cell) => cell.figure?.type === FigureType.ROOK && cell.figure.team === team,
  );
  const enemyTeamCells = cells.filter(
    (cell) => cell.figure?.team !== kingCell.figure!.team,
  );

  const enemiesStepsIds: CellIdType[] = enemyTeamCells.flatMap((cell) =>
    getSteps({ cells, currentCell: cell, ignoreCastling: true }).map(
      (step) => step.cellId,
    ),
  );

  const castlingSteps: IStep[] = [];

  rookCells.forEach((rookCell) => {
    if (!rookCell.figure!.isFirstStep) return;
    if (rookCell.id[1] !== kingCell.id[1]) return;
    if (!cellNumbersBoundaryValues.includes(rookCell.id[1] as NumberValueType)) return;
    const baseCastlingProps = { enemiesStepsIds, kingCell, rookCell, cells };

    const castlingStep =
      getCastlingType(rookCell.id) === CastlingType.SHORT
        ? getShortCastlingStep({ handleMove: getRightId, ...baseCastlingProps })
        : getLongCastlingStep({ handleMove: getLeftId, ...baseCastlingProps });
    if (castlingStep) castlingSteps.push(castlingStep);
  });

  return castlingSteps;
}

import { FigureType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import type { CellIdType } from '@/entities/Cell/types';
import { teamHandlersMap } from '@/services/stepsController/data';
import getLongCastlingStep from '@/services/stepsController/handlers/king/getLongCastlingStep';
import getShortCastlingStep from '@/services/stepsController/handlers/king/getShortCastlingStep';
import { HandlerType } from '@/services/stepsController/types';
import { IStep } from '@/store/slices/cells/types';
import { getSteps } from '@/store/slices/cells/utils/helpers';

export enum CastlingType {
  SHORT = 'short',
  LONG = 'long',
}

export interface ICastlingStep {
  kingCell: ICellAsPlainObject;
  rookCell: ICellAsPlainObject;
  cells: ICellAsPlainObject[];
  enemiesStepsIds: CellIdType[];
  handleMove: HandlerType;
}

export const getCastlingType = (cell: ICellAsPlainObject) => {
  const { left: getLeftCell } = teamHandlersMap[cell.figure!.team];
  return getLeftCell(cell.id) ? CastlingType.SHORT : CastlingType.LONG;
};

export default function (cells: ICellAsPlainObject[], kingCell: ICellAsPlainObject) {
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
    const { left, right } = teamHandlersMap[rookCell.figure!.team];
    const baseCastlingProps = { enemiesStepsIds, kingCell, rookCell, cells };
    const castlingStep =
      getCastlingType(rookCell) === CastlingType.SHORT
        ? getShortCastlingStep({ handleMove: right, ...baseCastlingProps })
        : getLongCastlingStep({ handleMove: left, ...baseCastlingProps });
    if (castlingStep) castlingSteps.push(castlingStep);
  });

  return castlingSteps;
}

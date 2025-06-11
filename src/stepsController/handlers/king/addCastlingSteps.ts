import { FigureType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import type { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/redux/slices/cells/types';
import { getSteps } from '@/redux/slices/cells/utils/helpers';
import { teamHandlersMap } from '@/stepsController/data';
import getCastlingStep from '@/stepsController/handlers/king/getCastlingStep';

export enum CastlingType {
  'SHORT' = 'short',
  'LONG' = 'long',
}

export const getCastlingType = (cell: ICellAsPlainObject) => {
  const { left } = teamHandlersMap[cell.figure!.team];
  return left(cell.id) ? CastlingType.SHORT : CastlingType.LONG;
};

export default function (
  cells: ICellAsPlainObject[],
  steps: IStep[],
  kingCell: ICellAsPlainObject,
) {
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

  rookCells.forEach((rookCell) => {
    if (!rookCell.figure!.isFirstStep) return;
    const { left, right } = teamHandlersMap[rookCell.figure!.team];
    const baseCastlingProps = { enemiesStepsIds, kingCell, rookCell, cells, steps };
    getCastlingType(rookCell) === CastlingType.SHORT
      ? getCastlingStep({ moveHandler: right, ...baseCastlingProps })
      : getCastlingStep({ moveHandler: left, ...baseCastlingProps });
  });
}

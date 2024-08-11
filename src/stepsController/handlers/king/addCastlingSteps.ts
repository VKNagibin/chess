import Cell from '@/entities/Cell/Cell';
import { FigureType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { teamHandlersMap } from '@/stepsController/data';
import getCastlingStep from '@/stepsController/handlers/king/getCastlingStep';
import { IStep } from '@/stores/cell/types';
import { getSteps } from '@/stores/cell/utils/helpers';

export enum CastlingType {
  'SHORT' = 'short',
  'LONG' = 'long',
}

export const getCastlingType = (cell: Cell) => {
  const { left } = teamHandlersMap[cell.figure!.team];
  return left(cell.id) ? CastlingType.SHORT : CastlingType.LONG;
};

export default function (cells: Cell[], steps: IStep[], kingCell: Cell) {
  const team = kingCell.figure!.team;
  const rookCells = cells.filter(
    (cell) => cell.figure?.type === FigureType.ROOK && cell.figure.team === team,
  );
  const enemyTeamCells = cells.filter(
    (cell) => cell.figure?.team !== kingCell.figure!.team,
  );

  const enemiesStepsIds: CellIdType[] = enemyTeamCells.flatMap((cell) =>
    getSteps(cells, cell, true).map((step) => step.cellId),
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

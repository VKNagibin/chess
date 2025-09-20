import { FigureTeam } from '@/entities/Cell/enums';
import type { ICell } from '@/entities/Cell/types';
import { checkIsKing, getSteps } from '@/store/slices/cells/utils/helpers';

export default function (cells: ICell[], activeTeam: FigureTeam): ICell[] {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const enemyTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team !== activeTeam,
  );

  const kingCellId = cellsWithFigures.find(
    (cell) => cell.figure!.team === activeTeam && checkIsKing(cell),
  )?.id;

  const kingEnemies: ICell[] = [];

  enemyTeamCells.forEach((enemyCell) => {
    const cellSteps = getSteps({ cells, currentCell: enemyCell, ignoreCastling: true });
    cellSteps.forEach((step) => {
      step.cellId === kingCellId && kingEnemies.push(enemyCell);
    });
  });

  return kingEnemies;
}

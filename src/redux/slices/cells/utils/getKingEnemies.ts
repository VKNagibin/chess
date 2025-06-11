import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { checkIsKing, getSteps } from '@/redux/slices/cells/utils/helpers';

export default function (
  cells: ICellAsPlainObject[],
  currentTeam: FigureTeam,
): ICellAsPlainObject[] {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const enemyTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team !== currentTeam,
  );

  const kingCellId = cellsWithFigures.find(
    (cell) => cell.figure!.team === currentTeam && checkIsKing(cell),
  )?.id;

  const kingEnemies: ICellAsPlainObject[] = [];

  enemyTeamCells.forEach((enemyCell) => {
    const cellSteps = getSteps({ cells, currentCell: enemyCell, ignoreCastling: true });
    cellSteps.forEach((step) => {
      step.cellId === kingCellId && kingEnemies.push(enemyCell);
    });
  });

  return kingEnemies;
}

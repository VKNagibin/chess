import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import { checkIsKing, getSteps } from '@/stores/cell/utils';

export default function (cells: Cell[], currentTeam: FigureTeam): Cell[] {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const enemyTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team !== currentTeam,
  );

  const kingCellId = cellsWithFigures.find(
    (cell) => cell.figure!.team === currentTeam && checkIsKing(cell),
  )!.id;

  const kingEnemies: Cell[] = [];

  enemyTeamCells.forEach((enemyCell) => {
    const cellSteps = getSteps(cells, enemyCell);
    cellSteps.forEach((step) => {
      step.cellId === kingCellId && kingEnemies.push(enemyCell);
    });
  });

  return kingEnemies;
}

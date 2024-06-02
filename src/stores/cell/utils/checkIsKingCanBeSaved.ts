import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import getAfterStepBoardState from '@/stores/cell/utils/getAfterStepBoardState';
import getKingEnemies from '@/stores/cell/utils/getKingEnemies';
import { getSteps } from '@/stores/cell/utils/utils';

export default function (cells: Cell[], currentTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const currentTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === currentTeam,
  );

  for (let cellIndex = 0; cellIndex < currentTeamCells.length; cellIndex++) {
    const cellSteps = getSteps(cells, currentTeamCells[cellIndex]);
    for (let stepIndex = 0; stepIndex < cellSteps.length; stepIndex++) {
      const testCurrentCell = cells.find(
        (cell) => cell.id === cellSteps[stepIndex].cellId,
      )!;
      const { cells: testAfterStepCells, currentFigure } = getAfterStepBoardState(
        testCurrentCell,
        cells,
        currentTeamCells[cellIndex],
      );
      const kingEnemies = getKingEnemies(testAfterStepCells, currentFigure.team);
      if (!kingEnemies.length) return true;
    }
  }

  return false;
}

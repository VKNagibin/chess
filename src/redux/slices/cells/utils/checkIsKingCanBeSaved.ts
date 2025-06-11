import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import getAfterStepBoardState from '@/redux/slices/cells/utils/getAfterStepBoardState';
import getKingEnemies from '@/redux/slices/cells/utils/getKingEnemies';
import { getSteps } from '@/redux/slices/cells/utils/helpers';

export default function (cells: ICellAsPlainObject[], currentTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const currentTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === currentTeam,
  );

  for (let cellIndex = 0; cellIndex < currentTeamCells.length; cellIndex++) {
    const cellSteps = getSteps({ cells, currentCell: currentTeamCells[cellIndex] });
    for (let stepIndex = 0; stepIndex < cellSteps.length; stepIndex++) {
      const testCurrentCell = cells.find(
        (cell) => cell.id === cellSteps[stepIndex].cellId,
      )!;
      const { afterStepBoardState, stepOwnerCell } = getAfterStepBoardState({
        currentCell: testCurrentCell,
        cells,
        stepOwner: currentTeamCells[cellIndex],
      });

      const kingEnemies = getKingEnemies(
        afterStepBoardState,
        stepOwnerCell!.figure!.team,
      );
      if (!kingEnemies.length) return true;
    }
  }

  return false;
}

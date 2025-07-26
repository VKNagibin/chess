import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import getAfterStepBoardState from '@/store/slices/cells/utils/handleStep/getAfterStepBoardState';
import getKingEnemies from '@/store/slices/cells/utils/handleStep/getKingEnemies';
import { getSteps } from '@/store/slices/cells/utils/helpers';

export default function (cells: ICellAsPlainObject[], currentTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const currentTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === currentTeam,
  );

  return currentTeamCells.some((cell) => {
    const steps = getSteps({ cells, currentCell: cell });

    return steps.some((step) => {
      const testCurrentCell = cells.find((cell) => cell.id === step.cellId)!;
      const { afterStepBoardState } = getAfterStepBoardState({
        currentCell: testCurrentCell,
        cells,
        stepOwner: cell,
      });

      const kingEnemies = getKingEnemies(afterStepBoardState, currentTeam);

      return !kingEnemies.length;
    });
  });
}

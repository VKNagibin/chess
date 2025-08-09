import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import getKingEnemies from '@/store/slices/cells/utils/getKingEnemies';
import { getSteps } from '@/store/slices/cells/utils/helpers';

import getAfterStepBoardState from './getAfterStepBoardState';

export default function (cells: ICellAsPlainObject[], currentTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const currentTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === currentTeam,
  );

  return currentTeamCells.some((cell) => {
    const steps = getSteps({ cells, currentCell: cell });

    return steps.some((step) => {
      const testCurrentCell = cells.find((cell) => cell.id === step.cellId)!;
      const { updatedCells } = getAfterStepBoardState({
        currentCell: testCurrentCell,
        cells,
        stepOwner: cell,
      });

      const kingEnemies = getKingEnemies(updatedCells, currentTeam);

      return !kingEnemies.length;
    });
  });
}

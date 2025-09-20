import { FigureTeam } from '@/entities/Cell/enums';
import type { ICell } from '@/entities/Cell/types';
import getKingEnemies from '@/store/slices/cells/utils/getKingEnemies';
import { getSteps } from '@/store/slices/cells/utils/helpers';

import getAfterStepBoardState from './getAfterStepBoardState';

export default function (cells: ICell[], activeTeam: FigureTeam): boolean {
  const cellsWithFigures = cells.filter((cell) => cell.figure);
  const activeTeamCells = cellsWithFigures.filter(
    (cell) => cell.figure!.team === activeTeam,
  );

  return activeTeamCells.some((cell) => {
    const steps = getSteps({ cells, currentCell: cell });

    return steps.some((step) => {
      const testCurrentCell = cells.find((cell) => cell.id === step.cellId)!;
      const { updatedCells } = getAfterStepBoardState({
        currentCell: testCurrentCell,
        cells,
        stepOwner: cell,
      });

      const kingEnemies = getKingEnemies(updatedCells, activeTeam);

      return !kingEnemies.length;
    });
  });
}

import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import { getEnemyTeam, resetCellsHighlight } from '@/stores/cell/utils';
import isKingCanBeSaved from '@/stores/cell/utils/checkIsKingCanBeSaved';
import getAfterStepBoardState from '@/stores/cell/utils/getAfterStepBoardState';
import getKingEnemies from '@/stores/cell/utils/getKingEnemies';

export function handleStep(currentCell: Cell, cells: Cell[]): Cell[] {
  const { cells: preparedCells, currentFigure } = getAfterStepBoardState(
    currentCell,
    cells,
  );
  const team = currentFigure.team;
  const ourKingEnemies = getKingEnemies(preparedCells, team);
  const theirKingEnemies = getKingEnemies(preparedCells, getEnemyTeam(team));

  if (ourKingEnemies.length)
    return getOurKingAttackResult(currentCell, team, preparedCells, cells);

  if (theirKingEnemies.length) getTheirKingAttackResult(currentCell, team, preparedCells);

  currentFigure.isFirstStep = false;
  return preparedCells;
}

function getOurKingAttackResult(
  currentCell: Cell,
  team: FigureTeam,
  preparedCells: Cell[],
  cells: Cell[],
) {
  if (isKingCanBeSaved(cells, team)) return resetCellsHighlight(cells);
  return preparedCells.map((cell) => {
    if (currentCell.id === cell.id)
      return {
        ...cell,
        isOver: true,
      };
    return cell;
  });
}

function getTheirKingAttackResult(
  currentCell: Cell,
  team: FigureTeam,
  preparedCells: Cell[],
) {
  if (isKingCanBeSaved(preparedCells, getEnemyTeam(team))) return preparedCells;
  return preparedCells.map((cell) => {
    if (currentCell.id === cell.id)
      return {
        ...cell,
        isOver: true,
      };
    return cell;
  });
}

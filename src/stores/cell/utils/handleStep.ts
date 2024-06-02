import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import isKingCanBeSaved from '@/stores/cell/utils/checkIsKingCanBeSaved';
import getAfterStepBoardState from '@/stores/cell/utils/getAfterStepBoardState';
import getKingEnemies from '@/stores/cell/utils/getKingEnemies';
import {
  checkIsKing,
  getEnemyTeam,
  resetCellsHighlight,
} from '@/stores/cell/utils/utils';

function getKing(cells: Cell[], team: FigureTeam) {
  return cells.find((cell) => cell.figure!.team === team && checkIsKing(cell));
}

export function handleStep(currentCell: Cell, cells: Cell[]): Cell[] {
  const { cells: preparedCells, currentFigure } = getAfterStepBoardState(
    currentCell,
    cells,
  );

  let finalCells = preparedCells;
  const team = currentFigure.team;
  const ourKing = getKing(preparedCells, team)!;
  const theirKing = getKing(preparedCells, getEnemyTeam(team))!;
  const ourKingEnemies = getKingEnemies(preparedCells, team);
  const theirKingEnemies = getKingEnemies(preparedCells, getEnemyTeam(team));

  if (ourKingEnemies.length)
    return getOurKingAttackResult(ourKing, currentCell, team, preparedCells, cells);
  else
    finalCells = finalCells.map((cell) => {
      if (cell.id === ourKing.id)
        return { ...cell, figure: { ...cell.figure, isUnderAttack: false } } as Cell;
      return cell;
    });

  if (theirKingEnemies.length)
    getTheirKingAttackResult(theirKing, currentCell, team, preparedCells);
  else
    finalCells = finalCells.map((cell) => {
      if (cell.id === theirKing.id)
        return { ...cell, figure: { ...cell.figure, isUnderAttack: false } } as Cell;
      return cell;
    });

  currentFigure.isFirstStep = false;
  return finalCells;
}

function getOurKingAttackResult(
  king: Cell,
  currentCell: Cell,
  team: FigureTeam,
  afterStepCells: Cell[],
  cells: Cell[],
): Cell[] {
  if (isKingCanBeSaved(cells, team)) {
    return resetCellsHighlight(cells).map((cell) => {
      if (cell.id === king?.id)
        return { ...cell, figure: { ...cell.figure, isUnderAttack: true } } as Cell;
      return cell;
    });
  }
  return afterStepCells.map((cell) => {
    if (currentCell.id === cell.id)
      return {
        ...cell,
        isOver: true,
      };
    return cell;
  });
}

function getTheirKingAttackResult(
  king: Cell,
  currentCell: Cell,
  team: FigureTeam,
  preparedCells: Cell[],
) {
  if (isKingCanBeSaved(preparedCells, getEnemyTeam(team))) {
    return preparedCells.map((cell) => {
      if (cell.id === king?.id)
        return { ...cell, figure: { ...cell.figure, isUnderAttack: true } } as Cell;
      return cell;
    });
  }
  return preparedCells.map((cell) => {
    if (currentCell.id === cell.id)
      return {
        ...cell,
        isOver: true,
      };
    return cell;
  });
}

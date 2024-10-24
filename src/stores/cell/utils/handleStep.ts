import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import getAfterStepBoardState from '@/stores/cell/utils/getAfterStepBoardState';
import getKingEnemies from '@/stores/cell/utils/getKingEnemies';
import getOurKingAttackResult from '@/stores/cell/utils/getOurKingAttackResult';
import getTheirKingAttackResult from '@/stores/cell/utils/getTheirKingAttackResult';
import { checkIsKing, getEnemyTeam } from '@/stores/cell/utils/helpers';

const clearCastling = (cells: Cell[]) =>
  cells.map((cell) => {
    if (!cell.castling.length) return cell;
    return { ...cell, castling: [] };
  });

function getKing(cells: Cell[], team: FigureTeam) {
  return cells.find((cell) => cell.figure?.team === team && checkIsKing(cell));
}

export function handleStep(currentCell: Cell, cells: Cell[]): Cell[] {
  const {
    cells: preparedCells,
    stepOwnerCell,
    currentFigure,
  } = getAfterStepBoardState(currentCell, cells);

  const team = currentFigure!.team;
  const ourKing = getKing(preparedCells, team)!;
  const theirKing = getKing(preparedCells, getEnemyTeam(team))!;
  const ourKingEnemies = getKingEnemies(preparedCells, team);
  const theirKingEnemies = getKingEnemies(preparedCells, getEnemyTeam(team));

  if (ourKingEnemies.length) {
    return getOurKingAttackResult(ourKing, currentCell, team, preparedCells, cells);
  } else
    preparedCells.forEach((cell) => {
      if (cell.id === ourKing.id) cell.figure!.isUnderAttack = false;
    });

  if (theirKingEnemies.length) {
    return getTheirKingAttackResult(theirKing, currentCell, team, preparedCells);
  } else
    preparedCells.forEach((cell) => {
      if (cell.id === theirKing.id) cell.figure!.isUnderAttack = false;
    });

  currentFigure.isFirstStep = false;
  const castlingStep = stepOwnerCell.castling.find(
    (cell) => cell.targetCellId === currentCell.id,
  );

  if (castlingStep) {
    const afterStepState = getAfterStepBoardState(
      castlingStep.dependent.targetCell,
      preparedCells,
      castlingStep.dependent.ownerCell,
    );
    return clearCastling(afterStepState.cells);
  }
  return clearCastling(preparedCells);
}

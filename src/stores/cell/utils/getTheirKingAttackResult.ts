import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import isKingCanBeSaved from '@/stores/cell/utils/checkIsKingCanBeSaved';
import { getEnemyTeam } from '@/stores/cell/utils/helpers';

export default function (
  king: Cell,
  currentCell: Cell,
  team: FigureTeam,
  preparedCells: Cell[],
) {
  if (isKingCanBeSaved(preparedCells, getEnemyTeam(team))) {
    return preparedCells.map((cell) => {
      if (cell.id === king?.id && cell.figure)
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

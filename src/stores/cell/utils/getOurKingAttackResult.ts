import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import isKingCanBeSaved from '@/stores/cell/utils/checkIsKingCanBeSaved';
import { resetCellsHighlight } from '@/stores/cell/utils/helpers';

export default function (
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

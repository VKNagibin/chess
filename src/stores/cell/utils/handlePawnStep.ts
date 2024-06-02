import Cell from '@/entities/Cell/Cell';
import { resetCellsHighlight } from '@/stores/cell/utils/utils';

export default function (stepOwner: Cell, currentCell: Cell, cells: Cell[]) {
  const cellsWithoutHighlight = resetCellsHighlight(cells);
  if (!currentCell.hiddenFigure)
    return cellsWithoutHighlight.map((cell) => {
      if (currentCell.enPassantCellId === cell.id) {
        return { ...cell, figure: stepOwner.figure, hiddenFigure: true };
      }
      if (cell.hiddenFigure)
        return {
          ...cell,
          hiddenFigure: false,
          figure: null,
        };

      if (cell.id === currentCell.id)
        return {
          ...cell,
          figure: stepOwner.figure,
        };
      if (cell.id === stepOwner.id) return { ...cell, figure: null };
      return cell;
    });

  const sourceCell = cells.find(
    (cell) => currentCell.figure?.id === cell.figure?.id && currentCell.id !== cell.id,
  );

  return cellsWithoutHighlight.map((cell) => {
    if (cell.id === sourceCell?.id) return { ...cell, figure: null };
    if (cell.id === currentCell.id)
      return { ...cell, figure: stepOwner.figure, hiddenFigure: false };
    if (stepOwner.id === cell.id)
      return {
        ...cell,
        figure: null,
      };
    return cell;
  });
}

import Cell from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/stores/cell/types';
import { findById } from '@/stores/cell/utils/helpers';

export default function (cells: Cell[], cellId: CellIdType, steps: IStep[]) {
  return cells.map((cell) => {
    if (cell.id === cellId) return { ...cell, highlight: HighlightType.SELECTED };
    const step = steps.find((step) => step.cellId === cell.id);
    if (!step) return cell;

    if (step?.highlight === HighlightType.CASTLING_STEP) {
      const selectedCell = findById(cells, cellId) as Cell;
      selectedCell.castling.push(step.castling!);
    }

    if (step)
      return {
        ...cell,
        highlight: step.highlight as HighlightType,
        enPassantCellId: step.enPassantCellId || null,
      };
    return cell;
  });
}

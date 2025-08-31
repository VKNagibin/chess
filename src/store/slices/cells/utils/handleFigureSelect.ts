import { HighlightType } from '@/entities/Cell/enums';
import type { ICell } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { findById } from '@/shared/utils/findById';
import { IStep } from '@/store/slices/cells/types';

export default function (cells: ICell[], cellId: CellIdType, steps: IStep[]): void {
  cells.forEach((cell) => {
    if (cell.id === cellId && cell.figure) {
      cell.highlight = HighlightType.SELECTED;
      return;
    }
    const step = steps.find((step) => step.cellId === cell.id);
    if (!step) return;

    if (step?.highlight === HighlightType.CASTLING_STEP) {
      const selectedCell = findById(cellId, cells) as ICell;
      selectedCell.castling.push(step.castling!);
    }

    if (step?.highlight) {
      cell.highlight = step.highlight as HighlightType;
      cell.enPassantCellId = step.enPassantCellId || null;
    }
  });
}

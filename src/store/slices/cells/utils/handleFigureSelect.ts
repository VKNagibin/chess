import { HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { findById } from '@/shared/utils/findById';
import { IStep } from '@/store/slices/cells/types';

export default function (
  cells: ICellAsPlainObject[],
  cellId: CellIdType,
  steps: IStep[],
): void {
  cells.forEach((cell) => {
    if (cell.id === cellId && cell.figure) {
      cell.highlight = HighlightType.SELECTED;
      return;
    }
    const step = steps.find((step) => step.cellId === cell.id);
    if (!step) return;

    if (step?.highlight === HighlightType.CASTLING_STEP) {
      const selectedCell = findById(cellId, cells) as ICellAsPlainObject;
      selectedCell.castling.push(step.castling!);
    }

    if (step?.highlight) {
      cell.highlight = step.highlight as HighlightType;
      cell.enPassantCellId = step.enPassantCellId || null;
    }
  });
}

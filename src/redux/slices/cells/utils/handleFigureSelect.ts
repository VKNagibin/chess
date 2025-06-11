import { HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/redux/slices/cells/types';
import { findById } from '@/redux/slices/cells/utils/helpers';

export default function (
  cells: ICellAsPlainObject[],
  cellId: CellIdType,
  steps: IStep[],
): void {
  cells.forEach((cell) => {
    if (cell.id === cellId) {
      cell.highlight = HighlightType.SELECTED;
      return;
    }
    const step = steps.find((step) => step.cellId === cell.id);
    if (!step) return;

    if (step?.highlight === HighlightType.CASTLING_STEP) {
      const selectedCell = findById(cells, cellId) as ICellAsPlainObject;
      selectedCell.castling.push(step.castling!);
    }

    if (step) {
      cell.highlight = step.highlight as HighlightType;
      cell.enPassantCellId = step.enPassantCellId || null;
    }
  });
}

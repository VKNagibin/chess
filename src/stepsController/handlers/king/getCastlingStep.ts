import Cell from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/redux/slices/cells/types';
import { findById } from '@/redux/slices/cells/utils/helpers';
import { HandlerType } from '@/stepsController/types';

export default function ({
  enemiesStepsIds,
  kingCell,
  rookCell,
  cells,
  steps,
  moveHandler,
}: {
  moveHandler: HandlerType;
  kingCell: ICellAsPlainObject;
  rookCell: ICellAsPlainObject;
  cells: ICellAsPlainObject[];
  steps: IStep[];
  enemiesStepsIds: CellIdType[];
}) {
  const kingSiblingCellId = moveHandler(kingCell.id)!;
  const kingSiblingCell = findById(cells, kingSiblingCellId) as Cell;
  if (kingSiblingCell.figure) return;
  if (enemiesStepsIds.includes(kingSiblingCellId)) return;
  const secondKingSiblingCellId = moveHandler(kingSiblingCellId)!;
  const secondKingSiblingCell = findById(cells, secondKingSiblingCellId) as Cell;
  if (secondKingSiblingCell.figure) return;
  if (enemiesStepsIds.includes(secondKingSiblingCellId)) return;
  steps.push({
    cellId: secondKingSiblingCellId,
    highlight: HighlightType.CASTLING_STEP,
    castling: {
      targetCellId: secondKingSiblingCellId,
      dependent: {
        ownerCell: rookCell,
        targetCell: kingSiblingCell,
      },
    },
  });
}

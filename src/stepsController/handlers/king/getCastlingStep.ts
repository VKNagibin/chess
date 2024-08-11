import Cell from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { HandlerType } from '@/stepsController/types';
import { IStep } from '@/stores/cell/types';
import { findById } from '@/stores/cell/utils/helpers';

export default function ({
  enemiesStepsIds,
  kingCell,
  rookCell,
  cells,
  steps,
  moveHandler,
}: {
  moveHandler: HandlerType;
  kingCell: Cell;
  rookCell: Cell;
  cells: Cell[];
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

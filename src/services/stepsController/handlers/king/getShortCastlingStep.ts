import Cell from '@/entities/Cell/Cell';
import { HighlightType } from '@/entities/Cell/enums';
import { ICastlingStep } from '@/services/stepsController/handlers/king/getCastlingSteps';
import { findById } from '@/shared/utils/findById';

export default function ({
  enemiesStepsIds,
  kingCell,
  rookCell,
  cells,
  handleMove,
}: ICastlingStep) {
  const kingSiblingCellId = handleMove(kingCell.id)!;
  const kingSiblingCell = findById(kingSiblingCellId, cells) as Cell;
  if (kingSiblingCell.figure) return;
  if (enemiesStepsIds.includes(kingSiblingCellId)) return;
  const secondKingSiblingCellId = handleMove(kingSiblingCellId)!;
  const secondKingSiblingCell = findById(secondKingSiblingCellId, cells) as Cell;
  if (secondKingSiblingCell.figure) return;
  if (enemiesStepsIds.includes(secondKingSiblingCellId)) return;
  return {
    cellId: secondKingSiblingCellId,
    highlight: HighlightType.CASTLING_STEP,
    castling: {
      targetCellId: secondKingSiblingCellId,
      dependent: {
        ownerCell: rookCell,
        targetCell: kingSiblingCell,
      },
    },
  };
}

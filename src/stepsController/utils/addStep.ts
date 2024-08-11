import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/stores/cell/types';
import { findById } from '@/stores/cell/utils/helpers';

type AddStepResultType = { done: boolean; type?: HighlightType };

export default function addStep(
  targetCellId: CellIdType | null,
  cells: Cell[],
  steps: IStep[],
  currentTeam: FigureTeam,
): AddStepResultType {
  if (!targetCellId) return { done: false };
  const targetCell = findById(cells, targetCellId) as Cell;
  if (!targetCell) return { done: false };
  if (!targetCell.figure || targetCell.hiddenFigure) {
    steps.push({
      cellId: targetCellId,
      highlight: HighlightType.DEFAULT_STEP,
    });
    return { done: true, type: HighlightType.DEFAULT_STEP };
  }
  if (targetCell.figure.team === currentTeam) return { done: false };

  steps.push({ cellId: targetCellId, highlight: HighlightType.KILL_STEP });
  return { done: true, type: HighlightType.KILL_STEP };
}

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { teamHandlersMap } from '@/stepsController/data';
import { IStep } from '@/stores/cell/types';
import { findById } from '@/stores/cell/utils/helpers';

export default function (cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const team = focusedCell.figure!.team;
  const { forward, topLeft, topRight } = teamHandlersMap[team];
  const oneToForwardId = forward(focusedCell.id);

  const previousStepAdded = addPawnDefaultStep(oneToForwardId, cells, steps);
  if (previousStepAdded && focusedCell.figure!.isFirstStep) {
    const twoToForwardId = forward(oneToForwardId!);
    addPawnDefaultStep(twoToForwardId, cells, steps, oneToForwardId!);
  }
  const leftId = topLeft(focusedCell.id);
  addPawnKillStep(leftId, cells, steps, team);
  const rightId = topRight(focusedCell.id);
  addPawnKillStep(rightId, cells, steps, team);

  return steps;
}

function addPawnDefaultStep(
  targetCellId: CellIdType | null,
  cells: Cell[],
  steps: IStep[],
  enPassantCellId?: CellIdType,
): boolean {
  if (!targetCellId) return false;
  const targetCell = findById(cells, targetCellId) as Cell;
  if (!targetCell) return false;
  if (targetCell.figure) return false;

  steps.push({
    cellId: targetCellId,
    highlight: HighlightType.DEFAULT_STEP,
    enPassantCellId: enPassantCellId,
  });
  return true;
}

function addPawnKillStep(
  targetCellId: CellIdType | null,
  cells: Cell[],
  steps: IStep[],
  currentTeam: FigureTeam,
): boolean {
  if (!targetCellId) return false;
  const targetCell = findById(cells, targetCellId) as Cell;
  if (!targetCell) return false;
  if (!targetCell.figure) return false;
  if (targetCell.figure.team === currentTeam) return false;

  steps.push({ cellId: targetCellId, highlight: HighlightType.KILL_STEP });
  return true;
}

import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { teamHandlersMap } from '@/services/stepsController/data';
import { findById } from '@/shared/utils/findById';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

export default function ({ cells, currentCell: pawnCell }: StepDataInterface) {
  if (!pawnCell.figure) return [];
  const steps: IStep[] = [];
  const team = pawnCell.figure.team;
  const { forward, topLeft, topRight } = teamHandlersMap[team];
  const oneToForwardId = forward(pawnCell.id);

  const previousStepAdded = addPawnDefaultStep(oneToForwardId, cells, steps);
  if (previousStepAdded && pawnCell.figure.isFirstStep) {
    const twoToForwardId = forward(oneToForwardId);
    addPawnDefaultStep(twoToForwardId, cells, steps, oneToForwardId!);
  }
  const leftId = topLeft(pawnCell.id);
  addPawnKillStep(leftId, cells, steps, team);
  const rightId = topRight(pawnCell.id);
  addPawnKillStep(rightId, cells, steps, team);

  return steps;
}

function addPawnDefaultStep(
  targetCellId: CellIdType | null,
  cells: ICellAsPlainObject[],
  steps: IStep[],
  enPassantCellId?: CellIdType,
): boolean {
  if (!targetCellId) return false;
  const targetCell = findById(targetCellId, cells) as Cell;
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
  cells: ICellAsPlainObject[],
  steps: IStep[],
  currentTeam: FigureTeam,
): boolean {
  if (!targetCellId) return false;
  const targetCell = findById(targetCellId, cells) as Cell;
  if (!targetCell) return false;
  if (!targetCell.figure) return false;
  if (targetCell.figure.team === currentTeam) return false;

  steps.push({ cellId: targetCellId, highlight: HighlightType.KILL_STEP });
  return true;
}

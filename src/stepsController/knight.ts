import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { PotentialStepType } from '@/stepsController/types';
import { IStep } from '@/stores/cell/types';
import { findById } from '@/stores/cell/utils';

import { teamHandlersMap } from './data';

export function addStep(
  targetCellId: CellIdType | null,
  cells: Cell[],
  steps: IStep[],
  currentTeam: FigureTeam,
): boolean {
  if (!targetCellId) return false;
  const targetCell = findById(cells, targetCellId) as Cell;
  if (!targetCell) return false;
  if (!targetCell.figure || targetCell.hiddenFigure) {
    steps.push({
      cellId: targetCellId,
      highlight: HighlightType.DEFAULT_STEP,
    });
    return true;
  }
  if (targetCell.figure.team === currentTeam) return false;

  steps.push({ cellId: targetCellId, highlight: HighlightType.KILL_STEP });
  return true;
}

export default function handleKnightSteps(cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const currentTeam = focusedCell.figure!.team;
  const { forward, left, right, backward } = teamHandlersMap[currentTeam];

  const knightPotentialSteps: PotentialStepType = {
    oneTopTwoLeftStep: forward(left(left(focusedCell.id))),
    oneTopTwoRightStep: forward(right(right(focusedCell.id))),
    oneBottomTwoLeftStep: backward(left(left(focusedCell.id))),
    oneBottomTwoRightStep: backward(right(right(focusedCell.id))),
    twoTopOneLeftStep: left(forward(forward(focusedCell.id))),
    twoTopOneRightStep: right(forward(forward(focusedCell.id))),
    twoBottomOneLeftStep: left(backward(backward(focusedCell.id))),
    twoBottomOneRightStep: right(backward(backward(focusedCell.id))),
  };

  Object.keys(knightPotentialSteps).forEach((stepName) => {
    addStep(knightPotentialSteps[stepName], cells, steps, currentTeam);
  });

  return steps;
}

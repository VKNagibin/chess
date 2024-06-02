import Cell from '@/entities/Cell/Cell';
import { teamHandlersMap } from '@/stepsController/data';
import { addStep } from '@/stepsController/knight';
import { PotentialStepType } from '@/stepsController/types';
import { IStep } from '@/stores/cell/types';

export function handleKingSteps(cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const currentTeam = focusedCell.figure!.team;
  const { forward, topRight, bottomRight, bottomLeft, topLeft, left, right, backward } =
    teamHandlersMap[currentTeam];

  const kingPotentialSteps: PotentialStepType = {
    oneToTop: forward(focusedCell.id),
    oneToBottom: backward(focusedCell.id),
    oneToLeft: left(focusedCell.id),
    oneToRight: right(focusedCell.id),
    oneToTopLeft: topLeft(focusedCell.id),
    oneToTopRight: topRight(focusedCell.id),
    oneToBottomLeft: bottomLeft(focusedCell.id),
    oneToBottomRight: bottomRight(focusedCell.id),
  };

  Object.keys(kingPotentialSteps).forEach((stepName) => {
    addStep(kingPotentialSteps[stepName], cells, steps, currentTeam);
  });

  return steps;
}

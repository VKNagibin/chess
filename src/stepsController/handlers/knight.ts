import Cell from '@/entities/Cell/Cell';
import { PotentialStepType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';
import { IStep } from '@/stores/cell/types';

import { teamHandlersMap } from '../data';

export default function (cells: Cell[], focusedCell: Cell) {
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

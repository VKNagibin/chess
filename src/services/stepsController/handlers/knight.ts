import { PotentialStepType } from '@/services/stepsController/types';
import addStep from '@/services/stepsController/utils/addStep';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

import { teamHandlersMap } from '../data';

export default function ({ cells, currentCell: knightCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const activeTeam = knightCell.figure?.team;
  if (!activeTeam) return [];
  const { forward, left, right, backward } = teamHandlersMap[activeTeam];

  const knightPotentialSteps: PotentialStepType = {
    oneTopTwoLeftStep: forward(left(left(knightCell.id))),
    oneTopTwoRightStep: forward(right(right(knightCell.id))),
    oneBottomTwoLeftStep: backward(left(left(knightCell.id))),
    oneBottomTwoRightStep: backward(right(right(knightCell.id))),
    twoTopOneLeftStep: left(forward(forward(knightCell.id))),
    twoTopOneRightStep: right(forward(forward(knightCell.id))),
    twoBottomOneLeftStep: left(backward(backward(knightCell.id))),
    twoBottomOneRightStep: right(backward(backward(knightCell.id))),
  };

  Object.keys(knightPotentialSteps).forEach((stepName) => {
    addStep(knightPotentialSteps[stepName], cells, steps, activeTeam);
  });

  return steps;
}

import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import { PotentialStepType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';

import { teamHandlersMap } from '../data';

export default function ({ cells, currentCell: knightCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const currentTeam = knightCell.figure?.team;
  if (!currentTeam) return [];
  const { forward, left, right, backward } = teamHandlersMap[currentTeam];

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
    addStep(knightPotentialSteps[stepName], cells, steps, currentTeam);
  });

  return steps;
}

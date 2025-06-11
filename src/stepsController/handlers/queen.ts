import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import { teamHandlersMap } from '@/stepsController/data';
import { RecursiveStepType } from '@/stepsController/types';
import addStepsRecursively from '@/stepsController/utils/addStepsRecursively';

export default function ({ cells, currentCell: queenCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const currentTeam = queenCell.figure!.team;
  const { topRight, bottomRight, topLeft, bottomLeft, forward, backward, left, right } =
    teamHandlersMap[currentTeam];

  const queenStepsHandlers: RecursiveStepType = [
    topRight,
    bottomRight,
    topLeft,
    bottomLeft,
    forward,
    backward,
    left,
    right,
  ];

  queenStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: queenCell.id,
      currentTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

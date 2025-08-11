import { teamHandlersMap } from '@/services/stepsController/data';
import { RecursiveStepType } from '@/services/stepsController/types';
import addStepsRecursively from '@/services/stepsController/utils/addStepsRecursively';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

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

import { teamHandlersMap } from '@/services/stepsController/data';
import { RecursiveStepType } from '@/services/stepsController/types';
import addStepsRecursively from '@/services/stepsController/utils/addStepsRecursively';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

export default function ({ cells, currentCell: queenCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const activeTeam = queenCell.figure!.team;
  const { topRight, bottomRight, topLeft, bottomLeft, forward, backward, left, right } =
    teamHandlersMap[activeTeam];

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
      activeTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

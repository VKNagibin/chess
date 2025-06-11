import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import { teamHandlersMap } from '@/stepsController/data';
import { RecursiveStepType } from '@/stepsController/types';
import addStepsRecursively from '@/stepsController/utils/addStepsRecursively';

export default function ({ cells, currentCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const currentTeam = currentCell.figure?.team;
  if (!currentTeam) return [];
  const { topRight, bottomRight, topLeft, bottomLeft } = teamHandlersMap[currentTeam];

  const bishopStepsHandlers: RecursiveStepType = [
    topRight,
    bottomRight,
    topLeft,
    bottomLeft,
  ];

  bishopStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: currentCell.id,
      currentTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

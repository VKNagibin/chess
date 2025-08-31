import { teamHandlersMap } from '@/services/stepsController/data';
import { RecursiveStepType } from '@/services/stepsController/types';
import addStepsRecursively from '@/services/stepsController/utils/addStepsRecursively';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

export default function ({ cells, currentCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const activeTeam = currentCell.figure?.team;
  if (!activeTeam) return [];
  const { topRight, bottomRight, topLeft, bottomLeft } = teamHandlersMap[activeTeam];

  const bishopStepsHandlers: RecursiveStepType = [
    topRight,
    bottomRight,
    topLeft,
    bottomLeft,
  ];

  bishopStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: currentCell.id,
      activeTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

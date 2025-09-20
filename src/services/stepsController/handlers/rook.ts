import { teamHandlersMap } from '@/services/stepsController/data';
import { RecursiveStepType } from '@/services/stepsController/types';
import addStepsRecursively from '@/services/stepsController/utils/addStepsRecursively';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

export default function ({ cells, currentCell: rookCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const activeTeam = rookCell.figure?.team;
  if (!activeTeam) return [];
  const { forward, backward, left, right } = teamHandlersMap[activeTeam];
  const rookStepsHandlers: RecursiveStepType = [forward, backward, left, right];

  rookStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: rookCell.id,
      activeTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

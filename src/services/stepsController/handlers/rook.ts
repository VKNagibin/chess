import { teamHandlersMap } from '@/services/stepsController/data';
import { RecursiveStepType } from '@/services/stepsController/types';
import addStepsRecursively from '@/services/stepsController/utils/addStepsRecursively';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

export default function ({ cells, currentCell: rookCell }: StepDataInterface) {
  const steps: IStep[] = [];
  const currentTeam = rookCell.figure?.team;
  if (!currentTeam) return [];
  const { forward, backward, left, right } = teamHandlersMap[currentTeam];
  const rookStepsHandlers: RecursiveStepType = [forward, backward, left, right];

  rookStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: rookCell.id,
      currentTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

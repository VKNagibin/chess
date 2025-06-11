import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import { teamHandlersMap } from '@/stepsController/data';
import { RecursiveStepType } from '@/stepsController/types';
import addStepsRecursively from '@/stepsController/utils/addStepsRecursively';

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

import Cell from '@/entities/Cell/Cell';
import { teamHandlersMap } from '@/stepsController/data';
import { RecursiveStepType } from '@/stepsController/types';
import addStepsRecursively from '@/stepsController/utils/addStepsRecursively';
import { IStep } from '@/stores/cell/types';

export default function (cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const currentTeam = focusedCell.figure!.team;
  const { forward, backward, left, right } = teamHandlersMap[currentTeam];
  const rookStepsHandlers: RecursiveStepType = [forward, backward, left, right];

  rookStepsHandlers.forEach((handler) => {
    addStepsRecursively({
      targetCellId: focusedCell.id,
      currentTeam,
      cells,
      steps,
      handler,
    });
  });

  return steps;
}

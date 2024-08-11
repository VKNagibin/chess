import Cell from '@/entities/Cell/Cell';
import { teamHandlersMap } from '@/stepsController/data';
import { RecursiveStepType } from '@/stepsController/types';
import addStepsRecursively from '@/stepsController/utils/addStepsRecursively';
import { IStep } from '@/stores/cell/types';

export default function (cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const currentTeam = focusedCell.figure!.team;
  const { topRight, bottomRight, topLeft, bottomLeft } = teamHandlersMap[currentTeam];

  const bishopStepsHandlers: RecursiveStepType = [
    topRight,
    bottomRight,
    topLeft,
    bottomLeft,
  ];

  bishopStepsHandlers.forEach((handler) => {
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

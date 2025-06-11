import { IStep, StepDataInterface } from '@/redux/slices/cells/types';
import { teamHandlersMap } from '@/stepsController/data';
import addCastlingSteps from '@/stepsController/handlers/king/addCastlingSteps';
import { PotentialStepType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';

export default function ({
  cells,
  currentCell: kingCell,
  ignoreCastling,
}: StepDataInterface) {
  const steps: IStep[] = [];
  const team = kingCell.figure!.team;
  const { forward, topRight, bottomRight, bottomLeft, topLeft, left, right, backward } =
    teamHandlersMap[team];

  const kingPotentialSteps: PotentialStepType = {
    oneToTop: forward(kingCell.id),
    oneToBottom: backward(kingCell.id),
    oneToLeft: left(kingCell.id),
    oneToRight: right(kingCell.id),
    oneToTopLeft: topLeft(kingCell.id),
    oneToTopRight: topRight(kingCell.id),
    oneToBottomLeft: bottomLeft(kingCell.id),
    oneToBottomRight: bottomRight(kingCell.id),
  };

  Object.keys(kingPotentialSteps).forEach((stepName) => {
    addStep(kingPotentialSteps[stepName], cells, steps, team);
  });

  if (ignoreCastling) return steps;
  if (kingCell.figure!.isUnderAttack) return steps;
  if (!kingCell.figure!.isFirstStep) return steps;

  addCastlingSteps(cells, steps, kingCell);

  return steps;
}

import { teamHandlersMap } from '@/services/stepsController/data';
import getCastlingSteps from '@/services/stepsController/handlers/king/getCastlingSteps';
import { PotentialStepType } from '@/services/stepsController/types';
import addStep from '@/services/stepsController/utils/addStep';
import { IStep, StepDataInterface } from '@/store/slices/cells/types';

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

  return [...steps, ...getCastlingSteps(cells, kingCell)];
}

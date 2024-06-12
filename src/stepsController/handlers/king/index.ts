import Cell from '@/entities/Cell/Cell';
import { teamHandlersMap } from '@/stepsController/data';
import addCastlingSteps from '@/stepsController/handlers/king/addCastlingSteps';
import { PotentialStepType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';
import { IStep } from '@/stores/cell/types';

export default function (cells: Cell[], kingCell: Cell, ignoreCastling?: boolean) {
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

import Cell from '@/entities/Cell/Cell';
import { FigureTeam } from '@/entities/Cell/enums';
import { teamHandlersMap } from '@/stepsController/data';
import { PotentialStepType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';
import { IStep } from '@/stores/cell/types';

export default function (cells: Cell[], focusedCell: Cell) {
  const steps: IStep[] = [];
  const team = focusedCell.figure!.team;
  const { forward, topRight, bottomRight, bottomLeft, topLeft, left, right, backward } =
    teamHandlersMap[team];

  const kingPotentialSteps: PotentialStepType = {
    oneToTop: forward(focusedCell.id),
    oneToBottom: backward(focusedCell.id),
    oneToLeft: left(focusedCell.id),
    oneToRight: right(focusedCell.id),
    oneToTopLeft: topLeft(focusedCell.id),
    oneToTopRight: topRight(focusedCell.id),
    oneToBottomLeft: bottomLeft(focusedCell.id),
    oneToBottomRight: bottomRight(focusedCell.id),
  };

  Object.keys(kingPotentialSteps).forEach((stepName) => {
    addStep(kingPotentialSteps[stepName], cells, steps, team);
  });

  addCastlingSteps(cells, steps, focusedCell, team);

  return steps;
}

function addCastlingSteps(cells: Cell[], steps: IStep[], king: Cell, team: FigureTeam) {
  if (!king.figure!.isFirstStep) return;
  if (!king.figure!.isUnderAttack) return;
}

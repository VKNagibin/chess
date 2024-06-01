import { FigureTeam } from '@/entities/Cell/enums';
import { IStepsHandlersSet } from '@/stepsController/types';
import {
  getBackwardId,
  getBottomLeftId,
  getBottomRightId,
  getForwardId,
  getLeftId,
  getRightId,
  getTopLeftId,
  getTopRightId,
} from '@/utils';

export const blackHandlersSet = {
  forward: getBackwardId,
  backward: getForwardId,
  topLeft: getBottomRightId,
  topRight: getBottomLeftId,
  left: getRightId,
  right: getLeftId,
};

export const whiteHandlersSet = {
  forward: getForwardId,
  backward: getBackwardId,
  topLeft: getTopLeftId,
  topRight: getTopRightId,
  left: getLeftId,
  right: getRightId,
};

export const teamHandlersMap: Record<FigureTeam, IStepsHandlersSet> = {
  [FigureTeam.BLACK]: blackHandlersSet,
  [FigureTeam.WHITE]: whiteHandlersSet,
};

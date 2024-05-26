import { FigureTeam } from '@/entities/Cell/enums';
import { IStepsHandlersSet } from '@/stepsController/types';
import {
  getBackwardId,
  getBottomLeftId,
  getBottomRightId,
  getForwardId,
  getTopLeftId,
  getTopRightId,
} from '@/utils';

export const blackHandlersSet = {
  forward: getBackwardId,
  backward: getForwardId,
  left: getBottomRightId,
  right: getBottomLeftId,
};

export const whiteHandlersSet = {
  forward: getForwardId,
  backward: getBackwardId,
  left: getTopLeftId,
  right: getTopRightId,
};

export const teamHandlersMap: Record<FigureTeam, IStepsHandlersSet> = {
  [FigureTeam.BLACK]: blackHandlersSet,
  [FigureTeam.WHITE]: whiteHandlersSet,
};

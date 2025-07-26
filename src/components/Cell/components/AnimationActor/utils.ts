import {
  deadAnimationKeyframes,
  deadAnimationOptions,
  getMoveAnimationKeyframes,
  hideAnimationKeyframes,
  hideAnimationOptions,
  kingAnimationKeyframes,
  kingAnimationOptions,
  moveAnimationOptions,
  pulsateAnimationTypeList,
} from '@/components/Cell/components/AnimationActor/data';
import type {
  CheckIsMoveAnimationType,
  IRunActorAnimation,
} from '@/components/Cell/components/AnimationActor/types';
import { AnimationActionType, IFigureAnimationConfig } from '@/entities/Cell/types';
import Logger from '@/services/Logger';

const checkIsMoveAnimationType: CheckIsMoveAnimationType = (
  animationConfig,
  coordinates,
) =>
  !!(
    animationConfig.action === AnimationActionType.MOVE &&
    coordinates &&
    animationConfig.coordinates
  );

const checkIsPulsateAnimationType = (animationConfig: IFigureAnimationConfig) =>
  pulsateAnimationTypeList.includes(animationConfig.action);

const checkIsDeadAnimationType = (animationConfig: IFigureAnimationConfig) =>
  animationConfig.action === AnimationActionType.DEAD;

const checkIsHideAnimationType = (animationConfig: IFigureAnimationConfig) =>
  animationConfig.action === AnimationActionType.HIDE;

export const runActorAnimation = ({
  actor,
  animationConfig,
  coordinates,
  addAnimation,
}: IRunActorAnimation): Animation | null => {
  if (checkIsPulsateAnimationType(animationConfig)) {
    addAnimation({ animation: animationConfig });
    return actor.animate(kingAnimationKeyframes, kingAnimationOptions);
  }

  if (checkIsHideAnimationType(animationConfig)) {
    addAnimation({ animation: animationConfig });
    return actor.animate(hideAnimationKeyframes, hideAnimationOptions);
  }

  if (checkIsMoveAnimationType(animationConfig, coordinates)) {
    const x = animationConfig.coordinates!.x - coordinates.x;
    const y = animationConfig.coordinates!.y - coordinates.y;
    addAnimation({ animation: animationConfig });
    return actor.animate(getMoveAnimationKeyframes(x, y), moveAnimationOptions);
  }

  if (checkIsDeadAnimationType(animationConfig)) {
    addAnimation({ animation: animationConfig });
    return actor.animate(deadAnimationKeyframes, deadAnimationOptions);
  }

  return null;
};

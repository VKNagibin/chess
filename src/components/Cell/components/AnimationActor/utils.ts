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
  secondActorSwapAnimationKeyframes,
  secondSwapAnimationOptions,
  swapAnimationKeyframes,
  swapAnimationOptions,
} from '@/components/Cell/components/AnimationActor/data';
import type {
  CheckIsMoveAnimationType,
  IRunActorAnimation,
} from '@/components/Cell/components/AnimationActor/types';
import { AnimationActionType, IFigureAnimationConfig } from '@/entities/Cell/types';

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

const checkIsSwapHideAnimation = (animationConfig: IFigureAnimationConfig) =>
  animationConfig.action === AnimationActionType.SWAP_HIDE;

const checkIsSwapShowAnimation = (animationConfig: IFigureAnimationConfig) =>
  animationConfig.action === AnimationActionType.SWAP_SHOW;

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
    addAnimation(animationConfig.id);
    return actor.animate(kingAnimationKeyframes, kingAnimationOptions);
  }

  if (checkIsHideAnimationType(animationConfig)) {
    addAnimation(animationConfig.id);
    return actor.animate(hideAnimationKeyframes, hideAnimationOptions);
  }

  if (checkIsMoveAnimationType(animationConfig, coordinates)) {
    const x = animationConfig.coordinates!.x - coordinates.x;
    const y = animationConfig.coordinates!.y - coordinates.y;
    addAnimation(animationConfig.id);
    return actor.animate(getMoveAnimationKeyframes(x, y), moveAnimationOptions);
  }

  if (checkIsDeadAnimationType(animationConfig)) {
    addAnimation(animationConfig.id);
    return actor.animate(deadAnimationKeyframes, deadAnimationOptions);
  }

  if (checkIsSwapHideAnimation(animationConfig)) {
    addAnimation(animationConfig.id);

    return actor.animate(swapAnimationKeyframes, swapAnimationOptions);
  }

  if (checkIsSwapShowAnimation(animationConfig)) {
    addAnimation(animationConfig.id);

    return actor.animate(secondActorSwapAnimationKeyframes, secondSwapAnimationOptions);
  }

  return null;
};

import { WrapperType } from 'react-svg';

import {
  deadAnimationOptions,
  moveAnimationOptions,
} from '@/components/AnimationActor/data';
import { AnimationActionType, IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { RectangularCoordinates } from '@/shared/types';

interface IRunActorAnimation {
  actor: WrapperType;
  animationConfig: IFigureActionAnimationConfig;
  coordinates: RectangularCoordinates;
}

const checkIsMoveAnimationType = (
  action?: AnimationActionType | null,
  coordinates?: RectangularCoordinates,
  animationCoordinates?: RectangularCoordinates,
) =>
  action === AnimationActionType.MOVE &&
  coordinates?.length === 2 &&
  animationCoordinates?.length === 2;

const checkIsDeadAnimationType = (action?: AnimationActionType | null) =>
  action === AnimationActionType.DEAD;

const getMoveAnimationKeyframes = (x: number, y: number) => [
  { transform: 'translate(0, 0)' },
  { transform: `translate(${x}px, ${y}px)` },
];

const getDeadAnimationKeyframes = () => [
  { transform: 'translate(0, 0)' },
  { transform: `translate(0, -1000px)`, display: 'none' },
];

export const runActorAnimation = ({
  actor,
  animationConfig,
  coordinates,
}: IRunActorAnimation) => {
  if (
    checkIsMoveAnimationType(
      animationConfig.action,
      coordinates,
      animationConfig.coordinates,
    )
  ) {
    const x = animationConfig.coordinates![0] - coordinates![0];
    const y = animationConfig.coordinates![1] - coordinates![1];
    actor.animate(getMoveAnimationKeyframes(x, y), moveAnimationOptions);
    return;
  }

  if (checkIsDeadAnimationType(animationConfig?.action)) {
    actor.animate(getDeadAnimationKeyframes(), deadAnimationOptions);
    return;
  }
};

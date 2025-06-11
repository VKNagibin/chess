import {
  deadAnimationOptions,
  moveAnimationOptions,
} from '@/components/AnimationActor/data';
import { AnimationActionType, IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { RectangularCoordinatesType } from '@/shared/types';

interface IRunActorAnimation {
  actor: SVGElement;
  animationConfig: IFigureActionAnimationConfig;
  coordinates: RectangularCoordinatesType;
}

const checkIsMoveAnimationType = (
  action: AnimationActionType,
  coordinates: RectangularCoordinatesType,
  animationCoordinates?: RectangularCoordinatesType | null,
) => action === AnimationActionType.MOVE && coordinates && animationCoordinates;

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
}: IRunActorAnimation): Animation | null => {
  if (
    checkIsMoveAnimationType(
      animationConfig.action,
      coordinates,
      animationConfig.coordinates,
    )
  ) {
    const x = animationConfig.coordinates!.x - coordinates.x;
    const y = animationConfig.coordinates!.y - coordinates.y;
    return actor.animate(getMoveAnimationKeyframes(x, y), moveAnimationOptions);
  }

  if (checkIsDeadAnimationType(animationConfig?.action)) {
    return actor.animate(getDeadAnimationKeyframes(), deadAnimationOptions);
  }

  return null;
};

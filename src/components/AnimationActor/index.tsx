import { memo, useEffect, useRef } from 'react';

import { runActorAnimation } from '@/components/AnimationActor/utils';
import { AnimationActionType, IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { useAppActions } from '@/redux/hooks';
import type { RectangularCoordinatesType } from '@/shared/types';

interface IProps {
  animationConfig: IFigureActionAnimationConfig | null;
  coordinates: RectangularCoordinatesType | null;
}

const AnimationActor = ({ animationConfig, coordinates }: IProps) => {
  const actorRef = useRef<SVGSVGElement | null>(null);
  const { resetCellsAnimation, changeTeam } = useAppActions();

  useEffect(() => {
    if (!actorRef.current || !animationConfig || !coordinates) return;

    const animation = runActorAnimation({
      actor: actorRef.current,
      animationConfig,
      coordinates,
    });

    if (animationConfig.action !== AnimationActionType.MOVE || !animation) return;

    animation.onfinish = () => {
      resetCellsAnimation();
      changeTeam();
    };
  }, [animationConfig]);

  if (!animationConfig) return;

  return (
    <svg ref={actorRef} className="FigureIcon">
      <use href={`/sprite.svg#${animationConfig.figureName}`} />
    </svg>
  );
};

export default memo(AnimationActor);

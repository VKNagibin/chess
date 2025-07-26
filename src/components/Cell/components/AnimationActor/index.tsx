import { memo, useEffect, useRef } from 'react';

import { runActorAnimation } from '@/components/Cell/components/AnimationActor/utils';
import FigureIcon from '@/components/FigureIcon';
import { IFigureAnimationConfig } from '@/entities/Cell/types';
import type { RectangularCoordinatesType } from '@/shared/types';
import { useAppActions } from '@/store/hooks';
interface IProps {
  animationConfig: IFigureAnimationConfig | null;
  coordinates: RectangularCoordinatesType | null;
}

const AnimationActor = ({ animationConfig, coordinates }: IProps) => {
  const actorRef = useRef<SVGSVGElement | null>(null);
  const { addAnimation, removeAnimation } = useAppActions();

  useEffect(() => {
    if (!actorRef.current || !animationConfig || !coordinates) return;

    const animation = runActorAnimation({
      actor: actorRef.current,
      animationConfig,
      coordinates,
      addAnimation,
    });

    if (!animation) return;

    animation.onfinish = () => {
      setTimeout(() => {
        removeAnimation({ id: animationConfig.id });
      });
    };
  }, [animationConfig]);

  if (!animationConfig?.figureName) return;

  return <FigureIcon ref={actorRef} name={animationConfig.figureName} />;
};

export default memo(AnimationActor);

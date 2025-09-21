import { memo, useEffect, useRef } from 'react';

import { runActorAnimation } from '@/components/Cell/components/AnimationActor/utils';
import FigureIcon from '@/components/FigureIcon';
import { IFigureAnimationConfig } from '@/entities/Cell/types';
import type { RectangularCoordinatesType } from '@/shared/types';
import { useAppActions } from '@/store/hooks';
interface IProps {
  animationConfig: IFigureAnimationConfig | null;
  coordinates: RectangularCoordinatesType | null;
  styles?: React.CSSProperties;
}

const AnimationActor = ({ animationConfig, coordinates, styles }: IProps) => {
  const actorRef = useRef<SVGSVGElement | null>(null);
  const { addAnimation, removeAnimation } = useAppActions();

  useEffect(() => {
    if (!actorRef.current || !animationConfig || !coordinates) return;

    requestAnimationFrame(() => {
      const animation = runActorAnimation({
        actor: actorRef.current!,
        animationConfig,
        coordinates,
        addAnimation,
      });

      if (!animation) return;

      animation.onfinish = () => {
        removeAnimation(animationConfig.id);
      };
    });
  }, [animationConfig]);

  if (!animationConfig?.figureName) return;

  return <FigureIcon styles={styles} ref={actorRef} name={animationConfig.figureName} />;
};

export default memo(AnimationActor);

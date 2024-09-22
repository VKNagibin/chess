import { runActorAnimation } from '_comp/AnimationActor/utils';
import figuresSvg, { FigureSvgNameType } from '_img/figures';
import { useEffect, useRef } from 'react';
import { ReactSVG } from 'react-svg';

import { IFigureActionAnimationConfig } from '@/entities/Cell/types';
import { RectangularCoordinates } from '@/shared/types';

interface IProps {
  className?: string;
  animationConfig: IFigureActionAnimationConfig;
  coordinates: RectangularCoordinates;
}

const AnimationActor = ({ className = '', animationConfig, coordinates }: IProps) => {
  const actorRef = useRef<ReactSVG | null>(null);

  useEffect(() => {
    if (!actorRef.current?.reactWrapper) return;
    runActorAnimation({
      actor: actorRef.current?.reactWrapper,
      animationConfig,
      coordinates,
    });
  }, [animationConfig, coordinates, actorRef.current?.reactWrapper]);

  if (!animationConfig?.actorIcon) return null;

  return (
    <ReactSVG
      // @ts-ignore
      ref={actorRef}
      className={`figureIconContainer ${className}`}
      src={figuresSvg[animationConfig.actorIcon as FigureSvgNameType]}
    />
  );
};

export default AnimationActor;

import { ActionCreatorWithPayload } from '@reduxjs/toolkit';

import { IFigureAnimationConfig } from '@/entities/Cell/types';
import { RectangularCoordinatesType } from '@/shared/types';

export interface IRunActorAnimation {
  actor: SVGElement;
  animationConfig: IFigureAnimationConfig;
  coordinates: RectangularCoordinatesType;
  addAnimation: ActionCreatorWithPayload<string, 'figuresAnimations/addAnimation'>;
}

export type CheckIsMoveAnimationType = (
  animationConfig: IFigureAnimationConfig,
  coordinates: RectangularCoordinatesType,
) => boolean;

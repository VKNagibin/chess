import { AnimationActionType } from '@/entities/Cell/types';

const hideAnimationDuration = 10;
const swapAnimationDuration = 200;
const moveAnimationDuration = 300;
const killAnimationDuration = 400;
const pulsateAnimationDuration = 600;
const pulsateScale = '1.3';
const killAnimationDistance = '-1000px';
const pulsateIterations = 2;

export const pulsateAnimationTypeList = [
  AnimationActionType.KING_ENEMY_PULSATE,
  AnimationActionType.KING_PULSATE,
];

export const getMoveAnimationKeyframes = (x: number, y: number) => [
  { transform: 'translate(0, 0)' },
  { transform: `translate(${x}px, ${y}px)` },
];

export const deadAnimationOptions = {
  fill: 'forwards' as FillMode,
  duration: killAnimationDuration,
  easing: 'ease-in-out',
};

export const moveAnimationOptions = {
  fill: 'forwards' as FillMode,
  duration: moveAnimationDuration,
  easing: 'ease-in-out',
};

export const hideAnimationOptions = {
  fill: 'forwards' as FillMode,
  duration: hideAnimationDuration,
};

export const deadAnimationKeyframes = [
  { transform: 'translate(0, 0)' },
  { transform: `translate(0, ${killAnimationDistance})` },
];

export const hideAnimationKeyframes = [{ opacity: 1 }, { opacity: 0 }];

export const kingAnimationKeyframes = [
  { transform: 'scale(1)' },
  { transform: `scale(${pulsateScale})` },
  { transform: 'scale(1)' },
];

export const kingAnimationOptions = {
  duration: pulsateAnimationDuration,
  iterations: pulsateIterations,
};

export const swapAnimationKeyframes = [
  { transform: 'scale(1)' },
  { transform: `scale(0)` },
];

export const secondSwapAnimationOptions = {
  duration: swapAnimationDuration,
  fill: 'forwards' as FillMode,
  delay: swapAnimationDuration,
};

export const swapAnimationOptions = {
  duration: swapAnimationDuration,
  fill: 'forwards' as FillMode,
};

export const secondActorSwapAnimationKeyframes = [
  { transform: `scale(0)` },
  { transform: 'scale(1)' },
];

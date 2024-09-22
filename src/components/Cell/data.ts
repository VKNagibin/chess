import { HighlightType } from '@/entities/Cell/enums';

// Check - в варианте "Шах" с английского
const kingCheckAnimationDuration = 600;

export const classByHighlightType: Record<HighlightType, string> = {
  [HighlightType.SELECTED]: 'selected',
  [HighlightType.KILL_STEP]: 'kill',
  [HighlightType.DEFAULT_STEP]: 'step',
  [HighlightType.CASTLING_STEP]: 'castling',
  [HighlightType.NONE]: '',
};

export const kingAnimationKeyframes = [
  { transform: 'scale(1)' },
  { transform: 'scale(1.5)' },
  { transform: 'scale(1)' },
];

export const kingAnimationOptions = {
  duration: kingCheckAnimationDuration,
};

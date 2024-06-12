import { HighlightType } from '@/entities/Cell/enums';

export const classByHighlightType: Record<HighlightType, string> = {
  [HighlightType.SELECTED]: 'selected',
  [HighlightType.KILL_STEP]: 'kill',
  [HighlightType.DEFAULT_STEP]: 'step',
  [HighlightType.CASTLING_STEP]: 'castling',
  [HighlightType.NONE]: '',
};

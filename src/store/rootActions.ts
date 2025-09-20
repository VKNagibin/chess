import { gameEngineActions } from '@/store/slices/cells/cellsSlice';
import { figuresAnimationsActions } from '@/store/slices/figuresAnimationsSlice';

export default {
  ...gameEngineActions,
  ...figuresAnimationsActions,
};

import { appActions } from '@/store/slices/appSlice';
import { gameEngineActions } from '@/store/slices/cells/cellsSlice';
import { figuresAnimationsActions } from '@/store/slices/figuresAnimationsSlice';

export default {
  ...appActions,
  ...gameEngineActions,
  ...figuresAnimationsActions,
};

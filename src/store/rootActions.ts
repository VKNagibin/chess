import { cellsActions } from '@/store/slices/cells/cellsSlice';
import { figuresAnimationsActions } from '@/store/slices/figuresAnimationsSlice';

export default {
  ...cellsActions,
  ...figuresAnimationsActions,
};

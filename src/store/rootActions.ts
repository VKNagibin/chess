import { cellsActions } from '@/store/slices/cells/cellsSlice';
import { currentTeamActions } from '@/store/slices/currentTeamSlice';
import { figuresAnimationsActions } from '@/store/slices/figuresAnimationsSlice';

export default {
  ...currentTeamActions,
  ...cellsActions,
  ...figuresAnimationsActions,
};

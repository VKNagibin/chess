import { cellsActions } from '@/redux/slices/cells/cellsSlice';
import { currentTeamActions } from '@/redux/slices/currentTeamSlice';

export default {
  ...currentTeamActions,
  ...cellsActions,
};

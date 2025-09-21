import { createListenerMiddleware } from '@reduxjs/toolkit';

import Cache from '@/services/Cache';
import { RootState } from '@/store';
import rootActions from '@/store/rootActions';

const changeActiveTeamMiddleware = createListenerMiddleware();

const legalWithoutAnimationsActions = ['gameEngine/clickOnCell'];
const legalActions = ['figuresAnimations/removeAnimation'];

changeActiveTeamMiddleware.startListening({
  predicate: (action, currentState) => {
    const { type: actionType } = action;

    const withAnimations = Cache.get('figuresAnimations');
    const { canChangeTeam } = (currentState as RootState).gameEngine;
    const { animationsInAction } = (currentState as RootState).figuresAnimations;

    if (!withAnimations)
      return canChangeTeam && legalWithoutAnimationsActions.includes(actionType);

    return canChangeTeam && !animationsInAction && legalActions.includes(actionType);
  },
  effect: async (_, { dispatch }) => {
    dispatch(rootActions.changeActiveTeam());
  },
});

export default changeActiveTeamMiddleware;

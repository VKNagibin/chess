import { createSlice } from '@reduxjs/toolkit';

import { IFigureAnimationConfig } from '@/entities/Cell/types';

export interface IBlockingAnimationsState {
  animations: IFigureAnimationConfig[];
  animationsInAction: boolean;
}

const initialState: IBlockingAnimationsState = {
  animations: [],
  animationsInAction: false,
};

export const figuresAnimationsSlice = createSlice({
  name: 'figuresAnimations',
  initialState,
  reducers: {
    addAnimation: (state, { payload }) => {
      state.animationsInAction = true;
      state.animations.push(payload.animation);
    },
    removeAnimation: (state, { payload }) => {
      state.animations = state.animations.filter(
        (animation) => payload.id !== animation.id,
      );
      if (!state.animations.length) state.animationsInAction = false;
    },
  },
});

export const figuresAnimationsActions = figuresAnimationsSlice.actions;

export default figuresAnimationsSlice.reducer;

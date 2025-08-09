import { createSlice } from '@reduxjs/toolkit';

export interface IBlockingAnimationsState {
  animationsIds: string[];
  animationsInAction: boolean;
}

const initialState: IBlockingAnimationsState = {
  animationsIds: [],
  animationsInAction: false,
};

export const figuresAnimationsSlice = createSlice({
  name: 'figuresAnimations',
  initialState,
  reducers: {
    addAnimation: (state, { payload }) => {
      state.animationsInAction = true;
      state.animationsIds.push(payload);
    },
    removeAnimation: (state, { payload }) => {
      state.animationsIds = state.animationsIds.filter(
        (animationId) => payload !== animationId,
      );
      if (!state.animationsIds.length) state.animationsInAction = false;
    },
    resetFiguresAnimationsState: () => initialState,
  },
});

export const figuresAnimationsActions = figuresAnimationsSlice.actions;

export default figuresAnimationsSlice.reducer;

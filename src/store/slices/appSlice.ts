import { createSlice } from '@reduxjs/toolkit';

import { getAppWidth } from '@/utils/getAppWidth';

export interface IAppSliceState {
  appWidth: number;
}

const initialState: IAppSliceState = {
  appWidth: getAppWidth(),
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setWidth: (state) => {
      state.appWidth = getAppWidth();
    },
  },
});

export const appActions = appSlice.actions;

export default appSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

import { FigureTeam } from '@/entities/Cell/enums';

export interface ITeamState {
  currentTeam: FigureTeam;
}

const initialState: ITeamState = {
  currentTeam: FigureTeam.WHITE,
};

export const currentTeamSlice = createSlice({
  name: 'currentTeam',
  initialState,
  reducers: {
    changeTeam: (state) => {
      state.currentTeam =
        state.currentTeam === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK;
    },
  },
});

export const currentTeamActions = currentTeamSlice.actions;

export default currentTeamSlice.reducer;

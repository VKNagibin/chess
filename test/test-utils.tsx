import {
  act,
  fireEvent,
  render,
  RenderOptions,
  screen,
  waitFor,
} from '@testing-library/react';
import { ReactNode } from 'react';

import AppProviders from '@/AppProviders';
import { CellIdType } from '@/entities/Cell/types';
import { ChessApi } from '@/services/api/lichessApi';
import { store } from '@/store';

export const renderUI = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'queries'> | undefined,
) => render(ui, { wrapper: AppProviders, ...options });

export const getFEN = () => store.getState().gameEngine.FEN;
export const clickOnCell = (cellId: CellIdType) => {
  const cellButton = screen.getByTestId(cellId);
  act(() => fireEvent.click(cellButton));
};

export const closeWelcomeModal = async () => {
  const welcomeModalCloseButton = screen.getByTestId('modal_close_button');
  act(() => {
    fireEvent.click(welcomeModalCloseButton);
  });

  await waitFor(() => expect(welcomeModalCloseButton).not.toBeInTheDocument());
};

export const chessApiStartGameMocks = () => {
  jest.spyOn(ChessApi, 'post').mockRejectedValue(Promise.resolve());
};

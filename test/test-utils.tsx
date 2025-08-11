import { act, fireEvent, render, RenderOptions, screen } from '@testing-library/react';
import { ReactNode } from 'react';

import AppProviders from '@/AppProviders';
import { CellIdType } from '@/entities/Cell/types';
import { store } from '@/store';

export const renderUI = (
  ui: ReactNode,
  options?: Omit<RenderOptions, 'queries'> | undefined,
) => render(ui, { wrapper: AppProviders, ...options });

export const getFEN = () => store.getState().cells.FEN;
export const clickOnCell = (cellId: CellIdType) => {
  const cellButton = screen.getByTestId(cellId);
  act(() => fireEvent.click(cellButton));
};

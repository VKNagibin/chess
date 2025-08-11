import '@testing-library/jest-dom';

import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import Cells from '@/components/Cells';
import { StaticGameStateUpdater } from '@/components/GameStateUpdater';
import { dispatch } from '@/store';
import { cellsActions } from '@/store/slices/cells/cellsSlice';

import { pawnMutateConfig } from '../../__mocks__/gameConfigs';
import { clickOnCell, getFEN, renderUI } from '../../test-utils';

const renderTestUI = () => {
  renderUI(
    <>
      <Cells />
      <StaticGameStateUpdater />
    </>,
  );
};

describe('pawn mutation', () => {
  it('queen', async () => {
    renderTestUI();

    act(() => {
      dispatch(cellsActions.startNewGame(pawnMutateConfig));
    });

    expect(getFEN()).toBe('5k2/2P5/8/8/8/8/8/4K3 w - - 0 1');

    clickOnCell('c7');
    clickOnCell('c8');

    expect(getFEN()).toBe('2P2k2/8/8/8/8/8/8/4K3 w - - 0 1');

    await waitFor(() =>
      expect(screen.getByText('Выберите фигуру взамен пешки c8')).toBeVisible(),
    );

    const modalButton = screen.getByText('Подтвердить');
    act(() => {
      fireEvent.click(modalButton);
    });

    await waitFor(() => expect(getFEN()).toBe('2Q2k2/8/8/8/8/8/8/4K3 b - - 0 1'));

    clickOnCell('f8');
    clickOnCell('e8');

    expect(getFEN()).toBe('2Q2k2/8/8/8/8/8/8/4K3 b - - 0 1');

    clickOnCell('f8');
    clickOnCell('f7');

    expect(getFEN()).toBe('2Q5/5k2/8/8/8/8/8/4K3 w - - 1 2');

    clickOnCell('c8');
    clickOnCell('c1');

    expect(getFEN()).toBe('8/5k2/8/8/8/8/8/2Q1K3 b - - 2 2');
  });

  it('knight mutate', async () => {
    renderTestUI();

    act(() => {
      dispatch(cellsActions.startNewGame(pawnMutateConfig));
    });

    expect(getFEN()).toBe('5k2/2P5/8/8/8/8/8/4K3 w - - 0 1');

    clickOnCell('c7');
    clickOnCell('c8');

    expect(getFEN()).toBe('2P2k2/8/8/8/8/8/8/4K3 w - - 0 1');

    await waitFor(() =>
      expect(screen.getByText('Выберите фигуру взамен пешки c8')).toBeVisible(),
    );

    const queenButton = screen.getByTestId('mutate_queen');
    const knightButton = screen.getByTestId('mutate_knight');
    const rookButton = screen.getByTestId('mutate_rook');
    const bishopButton = screen.getByTestId('mutate_bishop');

    expect(queenButton).toBeVisible();
    expect(knightButton).toBeVisible();
    expect(rookButton).toBeVisible();
    expect(bishopButton).toBeVisible();

    fireEvent.click(knightButton);

    const modalButton = screen.getByText('Подтвердить');
    act(() => {
      fireEvent.click(modalButton);
    });

    await waitFor(() => expect(getFEN()).toBe('2N2k2/8/8/8/8/8/8/4K3 b - - 0 1'));

    clickOnCell('f8');
    clickOnCell('e8');

    expect(getFEN()).toBe('2N1k3/8/8/8/8/8/8/4K3 w - - 1 2');

    clickOnCell('c8');
    clickOnCell('d6');

    expect(getFEN()).toBe('4k3/8/3N4/8/8/8/8/4K3 b - - 2 2');
  });
});

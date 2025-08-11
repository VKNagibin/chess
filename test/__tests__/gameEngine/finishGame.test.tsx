import '@testing-library/jest-dom';

import { act, fireEvent, screen, waitFor } from '@testing-library/react';

import Cells from '@/components/Cells';
import { StaticGameStateUpdater } from '@/components/GameStateUpdater';
import { dispatch } from '@/store';
import { cellsActions } from '@/store/slices/cells/cellsSlice';

import { gameOverStepConfig } from '../../__mocks__/gameConfigs';
import { clickOnCell, getFEN, renderUI } from '../../test-utils';

const renderTestUI = () => {
  renderUI(
    <>
      <Cells />
      <StaticGameStateUpdater />
    </>,
  );
};

describe('finish game', () => {
  it('white team win', async () => {
    renderTestUI();

    act(() => {
      dispatch(cellsActions.startNewGame(gameOverStepConfig));
    });

    expect(getFEN()).toBe('6Qk/7Q/8/5Q2/8/8/8/4K3 w - - 0 1');

    clickOnCell('f5');
    clickOnCell('f6');

    expect(getFEN()).toBe('6Qk/7Q/5Q2/8/8/8/8/4K3 b - - 1 1');

    await waitFor(() =>
      expect(screen.getByText('Игра окончена, Белые победили')).toBeVisible(),
    );

    const popupButton = screen.getByText('Понятно');
    act(() => {
      fireEvent.click(popupButton);
    });

    await waitFor(() =>
      expect(getFEN()).toBe('rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 1'),
    );
  });
});

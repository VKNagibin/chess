import { act } from '@testing-library/react';

import Cells from '@/components/Cells';
import { StaticGameStateUpdater } from '@/components/GameStateUpdater';
import { dispatch } from '@/store';
import { cellsActions } from '@/store/slices/cells/cellsSlice';

import { enPassantConfig } from '../../__mocks__/gameConfigs';
import { clickOnCell, getFEN, renderUI } from '../../test-utils';

const renderTestUI = () => {
  renderUI(
    <>
      <Cells />
      <StaticGameStateUpdater />
    </>,
  );
};

describe('enPassant', () => {
  it('enPassant kill', async () => {
    renderTestUI();
    act(() => {
      dispatch(cellsActions.startNewGame(enPassantConfig));
    });
    expect(getFEN()).toBe('7k/8/8/8/5p2/8/4P3/4K3 w - - 0 1');

    clickOnCell('e2');
    clickOnCell('e4');

    expect(getFEN()).toBe('7k/8/8/8/4Pp2/8/8/4K3 b - e3 0 1');

    clickOnCell('f4');

    expect(document.querySelectorAll('.kill').length).toBe(1);

    clickOnCell('e3');

    expect(getFEN()).toBe('7k/8/8/8/8/4p3/8/4K3 w - - 0 2');
  });

  it('enPassant ignore', async () => {
    renderTestUI();
    act(() => {
      dispatch(cellsActions.startNewGame(enPassantConfig));
    });

    expect(getFEN()).toBe('7k/8/8/8/5p2/8/4P3/4K3 w - - 0 1');

    clickOnCell('e1');
    clickOnCell('d1');

    expect(getFEN()).toBe('7k/8/8/8/5p2/8/4P3/3K4 b - - 1 1');

    clickOnCell('f4');
    clickOnCell('f2');

    expect(getFEN()).toBe('7k/8/8/8/8/8/4Pp2/3K4 w - f3 0 2');

    clickOnCell('e2');

    expect(document.querySelectorAll('.kill').length).toBe(1);

    clickOnCell('e4');

    expect(getFEN()).toBe('7k/8/8/8/4P3/8/5p2/3K4 b - e3 0 2');

    clickOnCell('f2');
    clickOnCell('f1');

    expect(getFEN()).toBe('7k/8/8/8/4P3/8/8/3K1p2 b - - 0 2');
  });
});

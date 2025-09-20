import { act } from '@testing-library/react';

import Cells from '@/components/Cells';
import { StaticGameStateUpdater } from '@/components/GameStateUpdater';
import { dispatch } from '@/store';
import { gameEngineActions } from '@/store/slices/cells/cellsSlice';

import { castlingsConfig } from '../../__mocks__/gameConfigs';
import { chessApiStartGameMocks, clickOnCell, getFEN, renderUI } from '../../test-utils';

const renderTestUI = () => {
  renderUI(
    <>
      <Cells />
      <StaticGameStateUpdater />
    </>,
  );
};

const getCastlingsLength = () => document.querySelectorAll('.castling').length;

describe('game engine tests', () => {
  beforeAll(() => {
    chessApiStartGameMocks();
  });

  it('white castlings', async () => {
    renderTestUI();
    act(() => {
      dispatch(gameEngineActions.startNewGame(castlingsConfig));
    });

    expect(getFEN()).toBe('r3k2r/8/5q2/8/8/8/6Q1/R3K2R w KQkq - 0 1');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(1);

    clickOnCell('g2');
    clickOnCell('f2');

    expect(getFEN()).toBe('r3k2r/8/5q2/8/8/8/5Q2/R3K2R b KQkq - 1 1');

    clickOnCell('a8');
    clickOnCell('b8');

    expect(getFEN()).toBe('1r2k2r/8/5q2/8/8/8/5Q2/R3K2R w KQk - 2 2');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(2);

    clickOnCell('f2');
    clickOnCell('f3');

    expect(getFEN()).toBe('1r2k2r/8/5q2/8/8/5Q2/8/R3K2R b KQk - 3 2');

    clickOnCell('b8');
    clickOnCell('c8');

    expect(getFEN()).toBe('2r1k2r/8/5q2/8/8/5Q2/8/R3K2R w KQk - 4 3');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(1);

    clickOnCell('f3');
    clickOnCell('f4');

    expect(getFEN()).toBe('2r1k2r/8/5q2/8/5Q2/8/8/R3K2R b KQk - 5 3');

    clickOnCell('c8');
    clickOnCell('d8');

    expect(getFEN()).toBe('3rk2r/8/5q2/8/5Q2/8/8/R3K2R w KQk - 6 4');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(1);

    clickOnCell('f4');
    clickOnCell('f5');

    expect(getFEN()).toBe('3rk2r/8/5q2/5Q2/8/8/8/R3K2R b KQk - 7 4');

    clickOnCell('h8');
    clickOnCell('g8');

    expect(getFEN()).toBe('3rk1r1/8/5q2/5Q2/8/8/8/R3K2R w KQ - 8 5');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(0);

    clickOnCell('f5');
    clickOnCell('f6');

    expect(getFEN()).toBe('3rk1r1/8/5Q2/8/8/8/8/R3K2R b KQ - 0 5');

    clickOnCell('g8');
    clickOnCell('h8');

    expect(getFEN()).toBe('3rk2r/8/5Q2/8/8/8/8/R3K2R w KQ - 1 6');

    clickOnCell('f6');
    clickOnCell('d6');

    expect(getFEN()).toBe('3rk2r/8/3Q4/8/8/8/8/R3K2R b KQ - 2 6');

    clickOnCell('d8');
    clickOnCell('b8');

    expect(getFEN()).toBe('1r2k2r/8/3Q4/8/8/8/8/R3K2R w KQ - 3 7');

    clickOnCell('e1');

    expect(getCastlingsLength()).toBe(2);

    clickOnCell('e1');
    clickOnCell('c1');

    expect(getFEN()).toBe('1r2k2r/8/3Q4/8/8/8/8/2KR3R b - - 4 7');

    clickOnCell('e8');

    expect(getCastlingsLength()).toBe(0);

    clickOnCell('b8');
    clickOnCell('a8');

    expect(getFEN()).toBe('r3k2r/8/3Q4/8/8/8/8/2KR3R w - - 5 8');

    clickOnCell('c1');

    expect(getCastlingsLength()).toBe(0);
  });
});

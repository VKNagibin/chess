import '@testing-library/jest-dom';

import Cells from '@/components/Cells';
import { StaticGameStateUpdater } from '@/components/GameStateUpdater';
import { dispatch } from '@/store';
import { gameEngineActions } from '@/store/slices/cells/cellsSlice';

import { highlightsConfig } from '../../__mocks__/gameConfigs';
import { chessApiStartGameMocks, clickOnCell, getFEN, renderUI } from '../../test-utils';

const renderTestUI = () => {
  renderUI(
    <>
      <Cells />
      <StaticGameStateUpdater />
    </>,
  );
};

const getStepsCellsLength = () => document.querySelectorAll('.step').length;
const getSelectedCellsLength = () => document.querySelectorAll('.cell .selected').length;

describe('highlights', () => {
  beforeAll(() => {
    chessApiStartGameMocks();
  });

  it('all figures highlights', async () => {
    renderTestUI();
    dispatch(gameEngineActions.startNewGame(highlightsConfig));

    expect(getFEN()).toBe('4k3/8/2R5/8/3QB3/8/4K3/8 w - - 0 1');

    clickOnCell('e2');

    expect(getStepsCellsLength()).toBe(8);
    expect(getSelectedCellsLength()).toBe(1);

    clickOnCell('e4');

    expect(getStepsCellsLength()).toBe(10);
    expect(getSelectedCellsLength()).toBe(1);

    clickOnCell('d4');

    expect(getStepsCellsLength()).toBe(23);
    expect(getSelectedCellsLength()).toBe(1);

    clickOnCell('c6');

    expect(getStepsCellsLength()).toBe(14);
    expect(getSelectedCellsLength()).toBe(1);
  });
});

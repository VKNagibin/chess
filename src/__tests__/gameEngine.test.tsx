import '@/services/lang/i18n';

import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';

import App from '@/components/App/App';
import Cache from '@/services/Cache';
import { dispatch, store } from '@/store';
import { cellsActions } from '@/store/slices/cells/cellsSlice';
import { enPassantConfig } from '@/store/slices/cells/placesConfig';
import { renderUI } from '@/test-utils';

const getFEN = () => store.getState().cells.FEN;

describe('', () => {
  beforeAll(() => {
    Cache.set('figuresAnimations', false);
  });

  it('enPassant works correct', async () => {
    dispatch(cellsActions.initCells({ config: enPassantConfig }));

    const renderer = renderUI(<App />);

    expect(getFEN()).toBe('7k/8/8/8/5p2/8/4P3/4K3 w - - 0 1');

    const e2Cell = renderer.getByTestId('e2');
    act(() => fireEvent.click(e2Cell));

    const e4Cell = renderer.getByTestId('e4');
    act(() => fireEvent.click(e4Cell));
    expect(getFEN()).toBe('7k/8/8/8/4Pp2/8/8/4K3 b - e3 0 1');

    const f4Cell = renderer.getByTestId('f4');
    act(() => fireEvent.click(f4Cell));

    const e3Cell = renderer.getByTestId('e3');
    act(() => fireEvent.click(e3Cell));
    expect(getFEN()).toBe('7k/8/8/8/8/4p3/8/4K3 w - - 0 2');
  });
});

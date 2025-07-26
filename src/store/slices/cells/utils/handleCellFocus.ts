import { FigureTeam } from '@/entities/Cell/enums';
import { CellIdType, ICellAsPlainObject } from '@/entities/Cell/types';
import { findById } from '@/shared/utils/findById';
import { IStep } from '@/store/slices/cells/types';
import handleFigureSelect from '@/store/slices/cells/utils/handleFigureSelect';
import { handleStep } from '@/store/slices/cells/utils/handleStep';
import {
  checkIsStep,
  findFocusedCell,
  getSteps,
  resetCellsHighlight,
} from '@/store/slices/cells/utils/helpers';

interface IHandleCellFocus {
  cells: ICellAsPlainObject[];
  currentTeam: FigureTeam;
  cellId: CellIdType;
}

export default ({ cells, cellId, currentTeam }: IHandleCellFocus): void => {
  const cellAlreadyFocused = findFocusedCell(cells)?.id === cellId;
  if (cellAlreadyFocused) return;

  const currentCell = findById(cellId, cells) as ICellAsPlainObject;
  const isFigureMove = checkIsStep(currentCell.highlight);
  const isFocusOnEnemiesFigure =
    currentCell.figure && currentCell.figure.team !== currentTeam;

  if (isFocusOnEnemiesFigure && !isFigureMove) return;

  if (isFigureMove) {
    handleStep({ currentCell, cells, currentTeam });
    return;
  }

  const steps: IStep[] = getSteps({ cells, currentCell });

  if (!steps.length) {
    resetCellsHighlight(cells);
    return;
  }

  resetCellsHighlight(cells);

  handleFigureSelect(cells, cellId, steps);
};

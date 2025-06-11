import { FigureTeam } from '@/entities/Cell/enums';
import { CellIdType, ICellAsPlainObject } from '@/entities/Cell/types';
import { IStep } from '@/redux/slices/cells/types';
import handleFigureSelect from '@/redux/slices/cells/utils/handleFigureSelect';
import { handleStep } from '@/redux/slices/cells/utils/handleStep';
import {
  checkIsStep,
  findById,
  findFocusedCell,
  getSteps,
  resetCellsHighlight,
} from '@/redux/slices/cells/utils/helpers';

export default ({
  cells,
  cellId,
  currentStepTeam,
}: {
  cells: ICellAsPlainObject[];
  currentStepTeam: FigureTeam;
  cellId: CellIdType;
}): void => {
  const cellAlreadyFocused = findFocusedCell(cells)?.id === cellId;
  if (cellAlreadyFocused) return;

  const currentCell = findById(cells, cellId) as ICellAsPlainObject;
  const isFigureMove = checkIsStep(currentCell.highlight);
  const isFocusOnEnemiesFigure =
    currentCell.figure && currentCell.figure.team !== currentStepTeam;

  if (isFocusOnEnemiesFigure && !isFigureMove) return;

  if (isFigureMove) return handleStep({ currentCell, cells });

  const steps: IStep[] = getSteps({ cells, currentCell });

  if (!steps.length) {
    resetCellsHighlight(cells);
    return;
  }

  resetCellsHighlight(cells);

  return handleFigureSelect(cells, cellId, steps);
};

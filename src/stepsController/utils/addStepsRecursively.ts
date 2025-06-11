import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { IStep } from '@/redux/slices/cells/types';
import { HandlerType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';

export interface IRecursiveStepsHandler {
  targetCellId: CellIdType | null;
  currentTeam: FigureTeam;
  cells: ICellAsPlainObject[];
  steps: IStep[];
  handler: HandlerType;
}

export default function addStepsRecursively({
  targetCellId,
  steps,
  cells,
  handler,
  currentTeam,
}: IRecursiveStepsHandler) {
  const step = handler(targetCellId);
  if (!step) return;
  const { done, type } = addStep(step, cells, steps, currentTeam);
  done &&
    type === HighlightType.DEFAULT_STEP &&
    addStepsRecursively({ targetCellId: step, steps, cells, handler, currentTeam });
}

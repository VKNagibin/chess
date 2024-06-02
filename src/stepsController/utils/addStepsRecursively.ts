import Cell from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import { CellIdType } from '@/entities/Cell/types';
import { HandlerType } from '@/stepsController/types';
import addStep from '@/stepsController/utils/addStep';
import { IStep } from '@/stores/cell/types';

export interface IRecursiveStepsHandler {
  targetCellId: CellIdType | null;
  currentTeam: FigureTeam;
  cells: Cell[];
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

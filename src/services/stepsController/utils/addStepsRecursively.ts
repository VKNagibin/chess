import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import type { ICell } from '@/entities/Cell/types';
import { CellIdType } from '@/entities/Cell/types';
import { HandlerType } from '@/services/stepsController/types';
import addStep from '@/services/stepsController/utils/addStep';
import { IStep } from '@/store/slices/cells/types';

export interface IRecursiveStepsHandler {
  targetCellId: CellIdType | null;
  activeTeam: FigureTeam;
  cells: ICell[];
  steps: IStep[];
  handler: HandlerType;
}

export default function addStepsRecursively({
  targetCellId,
  steps,
  cells,
  handler,
  activeTeam,
}: IRecursiveStepsHandler) {
  const step = handler(targetCellId);
  if (!step) return;
  const { done, type } = addStep(step, cells, steps, activeTeam);
  done &&
    type === HighlightType.DEFAULT_STEP &&
    addStepsRecursively({ targetCellId: step, steps, cells, handler, activeTeam });
}

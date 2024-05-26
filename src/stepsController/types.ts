import { CellIdType } from '@/entities/Cell/types';

type HandlerType = (id: CellIdType) => CellIdType | null;

export interface IStepsHandlersSet {
  forward: HandlerType;
  backward: HandlerType;
  left: HandlerType;
  right: HandlerType;
}

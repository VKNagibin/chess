import { CellIdType } from '@/entities/Cell/types';

type HandlerType = (id: CellIdType | null) => CellIdType | null;

export interface IStepsHandlersSet {
  forward: HandlerType;
  backward: HandlerType;
  right: HandlerType;
  left: HandlerType;
  topLeft: HandlerType;
  topRight: HandlerType;
}

import { CellIdType } from '@/entities/Cell/types';

export type HandlerType = (id: CellIdType | null) => CellIdType | null;

export interface IStepsHandlersSet {
  forward: HandlerType;
  backward: HandlerType;
  right: HandlerType;
  left: HandlerType;
  topLeft: HandlerType;
  topRight: HandlerType;
  bottomLeft: HandlerType;
  bottomRight: HandlerType;
}

export type PotentialStepType = { [key: string]: CellIdType | null };
export type RecursiveStepType = HandlerType[];

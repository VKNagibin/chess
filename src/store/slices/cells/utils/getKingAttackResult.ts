import { FigureTeam } from '@/entities/Cell/enums';
import { type ICell } from '@/entities/Cell/types';
import checkIsKingCanBeSaved from '@/store/slices/cells/utils/checkIsKingCanBeSaved';

interface IAttackResultProps {
  team: FigureTeam;
  cells: ICell[];
}

export enum KingAttackResult {
  DEAD = 'dead',
  ALIVE = 'alive',
}

export default function ({ team, cells }: IAttackResultProps): KingAttackResult {
  if (checkIsKingCanBeSaved(cells, team)) return KingAttackResult.ALIVE;

  return KingAttackResult.DEAD;
}

import { FigureTeam } from '@/entities/Cell/enums';
import type { ICellAsPlainObject } from '@/entities/Cell/types';
import checkIsKingCanBeSaved from '@/redux/slices/cells/utils/checkIsKingCanBeSaved';

interface IAttackResultProps {
  king: ICellAsPlainObject;
  team: FigureTeam;
  cells: ICellAsPlainObject[];
}
export default function ({ king, team, cells }: IAttackResultProps) {
  const kingCell = cells.find((cell) => cell.id === king?.id && cell.figure);
  if (!kingCell?.figure) {
    throw new Error('king cell not detected');
  }
  if (checkIsKingCanBeSaved(cells, team)) {
    kingCell.figure.isUnderAttack = true;
    return;
  }

  kingCell.isOver = true;
}

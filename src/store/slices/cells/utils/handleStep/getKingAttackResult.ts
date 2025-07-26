import { FigureTeam } from '@/entities/Cell/enums';
import { type ICellAsPlainObject, AnimationActionType } from '@/entities/Cell/types';
import { getFigureSvgName } from '@/entities/Figure/utils/getFigureSvgName';
import { uniqId } from '@/shared/utils/uniqId';
import checkIsKingCanBeSaved from '@/store/slices/cells/utils/handleStep/checkIsKingCanBeSaved';

interface IAttackResultProps {
  king: ICellAsPlainObject;
  team: FigureTeam;
  cells: ICellAsPlainObject[];
}
export default function ({ king, team, cells }: IAttackResultProps) {
  const kingCell = cells.find((cell) => cell.id === king?.id && cell.figure);
  if (!kingCell?.figure) {
    throw new Error('king figure not detected');
  }
  if (checkIsKingCanBeSaved(cells, team)) {
    kingCell.animationConfig = {
      id: uniqId(),
      action: AnimationActionType.KING_PULSATE,
      figureName: getFigureSvgName(kingCell.figure),
    };
    kingCell.figure.isUnderAttack = true;
    return;
  }

  kingCell.isOver = true;
}

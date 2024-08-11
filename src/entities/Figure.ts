import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { uniqId } from '@/entities/Cell/utils';

class Figure {
  id: string = uniqId();
  isMutatedPawn = false;
  isFirstStep = true;
  isUnderAttack = false;

  constructor(public type: FigureType, public team: FigureTeam) {}
}

export default Figure;

import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { uniqId } from '@/utils';

class Figure {
  id: string = uniqId();
  isFirstStep = true;

  constructor(public type: FigureType, public team: FigureTeam) {}
}

export default Figure;

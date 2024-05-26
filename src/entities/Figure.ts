import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { uniqId } from '@/utils';

class Figure {
  constructor(public type: FigureType, public team: FigureTeam) {}

  isFirstStep = true;

  id: string = uniqId();
}

export default Figure;

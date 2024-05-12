import { FigureTeam, FigureType } from '@/enums';
import { uniqId } from '@/utils';

class Figure {
  constructor(public type: FigureType, public team: FigureTeam, public cellId: string) {}

  id: string = uniqId();

  steps: string[] = [];
}

export default Figure;

import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { uniqId } from '@/shared/utils/uniqId';

export type IFigure = Omit<Figure, 'mutate' | 'toPlainObject'>;

export type FigureSvgNameType = `${FigureType}_${FigureTeam}`;

class Figure {
  id: string = uniqId();
  isFirstStep = true;
  isUnderAttack = false;

  constructor(public type: FigureType, public team: FigureTeam) {}

  toPlainObject = (): IFigure => ({
    id: this.id,
    team: this.team,
    type: this.type,
    isUnderAttack: this.isUnderAttack,
    isFirstStep: this.isFirstStep,
  });
}

export default Figure;

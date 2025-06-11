import { FigureTeam, FigureType } from '@/entities/Cell/enums';
import { uniqId } from '@/entities/Cell/utils';

export type FigureAsPlainObjectType = Pick<
  Figure,
  'id' | 'team' | 'isUnderAttack' | 'isFirstStep' | 'type' | 'isMutatedPawn'
>;

export type FigureSvgNameType = `${FigureType}_${FigureTeam}`;

class Figure {
  id: string = uniqId();
  isMutatedPawn = false;
  isFirstStep = true;
  isUnderAttack = false;

  constructor(public type: FigureType, public team: FigureTeam) {}

  toPlainObject = (): FigureAsPlainObjectType => ({
    id: this.id,
    team: this.team,
    isUnderAttack: this.isUnderAttack,
    isFirstStep: this.isFirstStep,
    type: this.type,
    isMutatedPawn: this.isMutatedPawn,
  });
}

export default Figure;

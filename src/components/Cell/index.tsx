import './index.less';

import LazySvg from '@components/LazySvg';
import { useUnit } from 'effector-react';
import { useEffect } from 'react';

import CellClass from '@/entities/Cell/Cell';
import { FigureTeam, HighlightType } from '@/entities/Cell/enums';
import Figure from '@/entities/Figure';
import { $currentStepTeam, onCellFocus } from '@/stores/cell';
import { checkIsStep } from '@/stores/cell/utils';

const classByHighlightType: Record<HighlightType, string> = {
  [HighlightType.SELECTED]: 'selected',
  [HighlightType.KILL_STEP]: 'kill',
  [HighlightType.DEFAULT_STEP]: 'step',
  [HighlightType.NONE]: '',
};

interface ICellsProps {
  cell: CellClass;
}

const getHoverClass = (cell: CellClass, currentStepTeam: FigureTeam) => {
  const isStep = checkIsStep(cell.highlight);
  const isCurrentTeam = currentStepTeam === cell.figure?.team;
  return isStep || isCurrentTeam ? 'filled' : '';
};

const getFigureSvgName = (figure: Figure) => `${figure.type}_${figure.team}`;

const Cell = ({ cell }: ICellsProps) => {
  const [handleCellFocus, currentStepTeam] = useUnit([onCellFocus, $currentStepTeam]);

  const hoverClass = getHoverClass(cell, currentStepTeam);

  const tabIndex = cell.figure ? 0 : -1;

  useEffect(() => {
    cell.isOver &&
      alert(
        `Game over! ${
          cell.figure?.team === FigureTeam.BLACK ? FigureTeam.WHITE : FigureTeam.BLACK
        } team win!`,
      );
  }, [cell.isOver]);

  return (
    <button
      onClick={() => handleCellFocus({ cellId: cell.id, currentStepTeam })}
      className={`cell ${cell.color} ${
        classByHighlightType[cell.highlight]
      } ${hoverClass}`}
      tabIndex={tabIndex}
    >
      {cell.figure && !cell.hiddenFigure ? (
        <LazySvg name={getFigureSvgName(cell.figure)} />
      ) : null}
    </button>
  );
};

export default Cell;

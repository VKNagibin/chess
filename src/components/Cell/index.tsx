import './index.less';

import LazySvg from '@components/LazySvg';

import CellClass from '@/entities/Cell/Cell';

import useCellLogic from './useCellLogic';
import { getFigureSvgName } from './utils';

interface ICellsProps {
  cell: CellClass;
}

const Cell = ({ cell }: ICellsProps) => {
  const { tabIndex, handleCellFocus, currentStepTeam, className } = useCellLogic(cell);

  return (
    <button
      onClick={() => handleCellFocus({ cellId: cell.id, currentStepTeam })}
      className={className}
      tabIndex={tabIndex}
    >
      {cell.figure && !cell.hiddenFigure ? (
        <LazySvg name={getFigureSvgName(cell.figure)} />
      ) : null}
    </button>
  );
};

export default Cell;

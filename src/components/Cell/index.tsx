import { StyledCell } from '@components/Cell/styled';
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
    <StyledCell
      onClick={() => handleCellFocus({ cellId: cell.id, currentStepTeam })}
      className={className}
      tabIndex={tabIndex}
    >
      {cell.figure && !cell.hiddenFigure ? (
        <LazySvg name={getFigureSvgName(cell.figure)} />
      ) : null}
    </StyledCell>
  );
};

export default Cell;

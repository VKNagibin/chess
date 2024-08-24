import { StyledCell } from '_comp/Cell/styled';
import figuresSvg from '_img/figures';
import { ReactSVG } from 'react-svg';

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
        <ReactSVG src={figuresSvg[getFigureSvgName(cell.figure)]} />
      ) : null}
    </StyledCell>
  );
};

export default Cell;

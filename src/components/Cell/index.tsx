import './index.less';

import LazySvg from '@components/LazySvg';
import { memo, useEffect, useMemo } from 'react';

import Board from '@/Board';
import CellClass from '@/Cell';
import { HighlightType } from '@/enums';
import Figure from '@/Figure';
import useForceUpdate from '@/hooks/useForceUpdate';

interface ICellsProps {
  cell: CellClass;
}

const getFigureSvgName = (figure: Figure) => `${figure.type}_${figure.team}`;

const Cell = ({ cell }: ICellsProps) => {
  const { changeHighlighted } = Board.getBoard();
  const forceUpdate = useForceUpdate();

  return (
    <button
      onClick={() => {
        changeHighlighted(cell.id, forceUpdate);
        forceUpdate();
      }}
      className={`cell ${cell.color} ${
        cell.highlight === HighlightType.SELECTED ? 'selected' : ''
      }`}
    >
      {cell.figure ? <LazySvg name={getFigureSvgName(cell.figure)} /> : null}
    </button>
  );
};

export default Cell;

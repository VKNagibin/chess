import Cell from '@components/Cell';
import { memo, useEffect } from 'react';

import CellClass from '@/Cell';
import useForceUpdate from '@/hooks/useForceUpdate';

interface ICellsProps {
  cells: CellClass[];
}

const Cells = ({ cells }: ICellsProps) => {
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    forceUpdate();
  }, [cells.length]);

  return (
    <>
      {cells.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </>
  );
};

export default memo(Cells);

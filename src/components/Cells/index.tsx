import { memo } from 'react';

import Cell from '@/components/Cell';

import useCells from './useCells';

const Cells = () => {
  const { cells, getContainerClassName } = useCells();
  return (
    <div className={getContainerClassName()}>
      {cells?.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default memo(Cells);

import React from 'react';

import Cell from '@/components/Cell';
import { StyledCellsWrapper } from '@/components/Cells/styled';
import { useAppSelector } from '@/redux/hooks';

const Cells = () => {
  const cells = useAppSelector(({ cells }) => cells?.cells);

  return (
    <StyledCellsWrapper>
      {cells?.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </StyledCellsWrapper>
  );
};

export default Cells;

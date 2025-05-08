import Cell from '@/components/Cell';
import { StyledCellsWrapper } from '@/components/Cells/styled';
import { useList } from 'effector-react';
import React from 'react';

import { $cells } from '@/stores/cell';

const Cells = () => {
  const cellsList = useList($cells, (cell) => <Cell key={cell.id} cell={cell} />);
  return <StyledCellsWrapper>{cellsList}</StyledCellsWrapper>;
};

export default Cells;

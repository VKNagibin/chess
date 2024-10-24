import Cell from '_comp/Cell';
import { StyledCellsWrapper } from '_comp/Cells/styled';
import { useList } from 'effector-react';
import React from 'react';

import { $cells } from '@/stores/cell';

const Cells = () => {
  const cellsList = useList($cells, (cell) => (
    <Cell
      key={cell.id}
      id={cell.id}
      animationConfig={cell.animationConfig}
      setCoordinates={cell.setCoordinates}
      hiddenFigure={cell.hiddenFigure}
      color={cell.color}
      highlight={cell.highlight}
      isOver={cell.isOver}
      x={cell.coordinates?.[0] || 0}
      y={cell.coordinates?.[1] || 0}
      figureTeam={cell.figure?.team}
      figureType={cell.figure?.type}
      figureUnderAttack={cell.figure?.isUnderAttack}
    />
  ));
  return <StyledCellsWrapper>{cellsList}</StyledCellsWrapper>;
};

export default Cells;

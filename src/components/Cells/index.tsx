import { memo } from 'react';

import Cell from '@/components/Cell';
import classes from '@/components/Cells/index.module.css';
import { useAppSelector } from '@/store/hooks';

const Cells = () => {
  const { cells, figuresAnimationsInAction } = useAppSelector(
    ({ cells, figuresAnimations }) => ({
      cells: cells.cells,
      figuresAnimationsInAction: figuresAnimations.animationsInAction,
    }),
  );

  const getContainerClassName = () => {
    let className = `${classes.container}`;
    if (figuresAnimationsInAction) className += ` ${classes.disabled}`;

    return className;
  };

  return (
    <div className={getContainerClassName()}>
      {cells?.map((cell) => (
        <Cell key={cell.id} cell={cell} />
      ))}
    </div>
  );
};

export default memo(Cells);

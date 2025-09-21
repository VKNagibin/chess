import { memo } from 'react';

import Cell from '@/components/Cell';
import classes from '@/components/Cells/index.module.scss';
import { useAppSelector } from '@/store/hooks';

const Cells = () => {
  const animationsInAction = useAppSelector(
    ({ figuresAnimations }) => figuresAnimations.animationsInAction,
  );
  const { cells, loading } = useAppSelector(({ gameEngine }) => gameEngine);

  const getContainerClassName = () => {
    let className = `${classes.container}`;
    if (animationsInAction || loading) className += ` ${classes.disabled}`;

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

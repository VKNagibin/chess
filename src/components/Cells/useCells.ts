import { useEffect } from 'react';

import classes from '@/components/Cells/index.module.scss';
import throttle from '@/shared/utils/throttle';
import { useAppActions, useAppSelector } from '@/store/hooks';

const windowResizeThrottle = 500;

const useCells = () => {
  const animationsInAction = useAppSelector(
    ({ figuresAnimations }) => figuresAnimations.animationsInAction,
  );
  const { cells, loading } = useAppSelector(({ gameEngine }) => gameEngine);
  const { resetCellsCoordinates } = useAppActions();

  const getContainerClassName = () => {
    let className = `${classes.container}`;
    if (animationsInAction || loading) className += ` ${classes.disabled}`;

    return className;
  };

  useEffect(() => {
    const onResize = throttle(() => {
      resetCellsCoordinates();
    }, windowResizeThrottle);

    addEventListener('resize', onResize);

    return () => {
      removeEventListener('resize', onResize);
    };
  }, []);

  return { cells, getContainerClassName };
};

export default useCells;

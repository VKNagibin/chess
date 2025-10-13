import { useEffect, useState } from 'react';

import { getAppWidth } from '@/utils/getAppWidth';

export const useAppWidth = () => {
  const [width, setWidth] = useState<number>(getAppWidth());

  useEffect(() => {
    const handler = () => {
      setWidth(getAppWidth());
    };

    addEventListener('resize', handler);

    return () => {
      removeEventListener('resize', handler);
    };
  }, []);

  return width;
};

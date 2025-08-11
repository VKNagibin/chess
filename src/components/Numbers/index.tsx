import { memo } from 'react';

import classes from '@/components/Numbers/index.module.css';
import { cellNumbersReversedList } from '@/entities/Cell/constants';

const Numbers = () => {
  return (
    <div className={classes.numset}>
      {cellNumbersReversedList.map((number) => {
        return (
          <div key={number} className={classes.number}>
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Numbers);

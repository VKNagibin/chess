import './index.less';

import { memo } from 'react';

import { cellNumbersReversedList } from '@/entities/Cell/constants';

const Numbers = () => {
  return (
    <div className="numset">
      {cellNumbersReversedList.map((number) => {
        return (
          <div key={number} className="number">
            {number}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Numbers);

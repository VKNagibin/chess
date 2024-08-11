import './index.less';

import { memo } from 'react';

import { cellNumbersReversedList } from '@/entities/Cell/constants';

interface IProps {
  className?: string;
}

const Numbers = ({ className }: IProps) => {
  return (
    <div className={`numset ${className}`}>
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

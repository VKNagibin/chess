import './index.less';

import { memo } from 'react';

import { cellCharsList } from '@/entities/Cell/constants';

interface IProps {
  className?: string;
}

const Chars = ({ className }: IProps) => {
  return (
    <div className={`charset ${className}`}>
      {cellCharsList.map((char) => {
        return (
          <div key={char} className="char">
            {char}
          </div>
        );
      })}
    </div>
  );
};

export default memo(Chars);

import { memo } from 'react';

import classes from '@/components/Chars/index.module.css';
import { cellCharsList } from '@/entities/Cell/constants';

const Chars = () => {
  return (
    <ul className={classes.charset}>
      {cellCharsList.map((char) => (
        <li key={char} className={classes.char}>
          {char}
        </li>
      ))}
    </ul>
  );
};

export default memo(Chars);

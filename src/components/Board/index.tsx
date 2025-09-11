import { memo } from 'react';

import classes from '@/components/Board/index.module.scss';
import Cells from '@/components/Cells';
import Chars from '@/components/Chars';
import Numbers from '@/components/Numbers';

function Board() {
  return (
    <div className={classes.board}>
      <Numbers />
      <div className={classes.boardCenter}>
        <Chars />
        <Cells />
        <Chars />
      </div>
      <Numbers />
    </div>
  );
}

export default memo(Board);

import { memo } from 'react';

import { StyledChar, StyledChars } from '@/components/Chars/styled';
import { cellCharsList } from '@/entities/Cell/constants';

const Chars = () => {
  return (
    <StyledChars>
      {cellCharsList.map((char) => (
        <StyledChar key={char}>{char}</StyledChar>
      ))}
    </StyledChars>
  );
};

export default memo(Chars);

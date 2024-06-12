import { StyledChar, StyledChars } from '@components/Chars/styled';
import { memo } from 'react';

import { cellCharsList } from '@/entities/Cell/constants';

interface IProps {
  append?: boolean;
}

const Chars = ({ append }: IProps) => {
  return (
    <StyledChars $append={append}>
      {cellCharsList.map((char) => (
        <StyledChar key={char}>{char}</StyledChar>
      ))}
    </StyledChars>
  );
};

export default memo(Chars);

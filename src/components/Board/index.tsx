import { StyledBoardCenter, StyledBoardWrapper } from '@components/Board/styled';
import Cells from '@components/Cells';
import Chars from '@components/Chars';
import Numbers from '@components/Numbers';

function Board() {
  return (
    <StyledBoardWrapper>
      <Numbers />
      <StyledBoardCenter>
        <Chars />
        <Cells />
        <Chars />
      </StyledBoardCenter>
      <Numbers />
    </StyledBoardWrapper>
  );
}

export default Board;

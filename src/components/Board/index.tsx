import { StyledBoardCenter, StyledBoardWrapper } from '_comp/Board/styled';
import Cells from '_comp/Cells';
import Chars from '_comp/Chars';
import Numbers from '_comp/Numbers';

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

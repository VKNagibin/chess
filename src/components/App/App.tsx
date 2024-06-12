import { StyledApp } from '@components/App/styled';
import Board from '@components/Board';
import StepTeam from '@components/StepTeam';

function App() {
  return (
    <StyledApp>
      <StepTeam />
      <Board />
    </StyledApp>
  );
}

export default App;

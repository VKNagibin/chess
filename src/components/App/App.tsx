import { StyledApp } from '_comp/App/styled';
import Board from '_comp/Board';
import LanguageDropdown from '_comp/LanguageDropdown';
import StepTeam from '_comp/StepTeam';

function App() {
  return (
    <StyledApp>
      <LanguageDropdown />
      <StepTeam />
      <Board />
    </StyledApp>
  );
}

export default App;

import './App.less';

import Cells from '@components/Cells';
import Chars from '@components/Chars';
import Numbers from '@components/Numbers';
import StepTeam from '@components/StepTeam';

function App() {
  return (
    <div className="app-container">
      <StepTeam />
      <div className="board">
        <Chars />
        <Numbers />
        <Cells />
        <Numbers className="append" />
        <Chars className="append" />
      </div>
    </div>
  );
}

export default App;

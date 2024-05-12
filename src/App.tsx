import './App.less';

import Cells from '@components/Cells';
import Chars from '@components/Chars';
import Numbers from '@components/Numbers';
import { useMemo } from 'react';

import Board from './Board';

function App() {
  const { cells } = useMemo(() => Board.getBoard(), []);

  return (
    <div className="app-container">
      <div className="board">
        <Chars />
        <Numbers />
        {cells ? <Cells cells={cells} /> : null}
        <Numbers className="append" />
        <Chars className="append" />
      </div>
    </div>
  );
}

export default App;

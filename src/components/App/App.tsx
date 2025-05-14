import React from 'react';

import { StyledApp } from '@/components/App/styled';
import Board from '@/components/Board';
import LanguageDropdown from '@/components/LanguageDropdown';
import StepTeam from '@/components/StepTeam';

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

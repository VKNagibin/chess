import { StyledApp } from '@/components/App/styled';
import Board from '@/components/Board';
import { GameStateUpdater, StaticGameStateUpdater } from '@/components/GameStateUpdater';
import LanguageDropdown from '@/components/LanguageDropdown';
import StepTeam from '@/components/StepTeam';
import Cache from '@/services/Cache';

if (Cache.get('figuresAnimations') === null) Cache.set('figuresAnimations', true);

function App() {
  return (
    <>
      {Cache.get('figuresAnimations') ? <GameStateUpdater /> : <StaticGameStateUpdater />}
      <StyledApp>
        <LanguageDropdown />
        <StepTeam />
        <Board />
      </StyledApp>
    </>
  );
}

export default App;

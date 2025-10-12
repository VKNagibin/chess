import classes from '@/components/App/App.module.css';
import Board from '@/components/Board';
import { GameStateUpdater, StaticGameStateUpdater } from '@/components/GameStateUpdater';
import StepTeam from '@/components/StepTeam';
import Cache from '@/services/Cache';

if (Cache.get('figuresAnimations') === null) Cache.set('figuresAnimations', true);
if (Cache.get('modalsAnimations') === null) Cache.set('modalsAnimations', true);

function App() {
  return (
    <>
      {Cache.get('figuresAnimations') ? <GameStateUpdater /> : <StaticGameStateUpdater />}
      <div className={classes.container}>
        <StepTeam />
        <Board />
      </div>
    </>
  );
}

export default App;

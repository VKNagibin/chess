import { useEffect } from 'react';

import classes from '@/components/App/App.module.css';
import Board from '@/components/Board';
import { GameStateUpdater, StaticGameStateUpdater } from '@/components/GameStateUpdater';
import StepTeam from '@/components/StepTeam';
import Cache from '@/services/Cache';
import { useAppActions } from '@/store/hooks';

if (Cache.get('figuresAnimations') === null) Cache.set('figuresAnimations', true);
if (Cache.get('modalsAnimations') === null) Cache.set('modalsAnimations', true);

function App() {
  const { setWidth } = useAppActions();

  useEffect(() => {
    const handler = () => {
      setWidth();
    };

    addEventListener('resize', handler);

    return () => {
      removeEventListener('resize', handler);
    };
  }, []);

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

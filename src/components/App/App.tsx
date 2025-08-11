import { StyledApp } from '@/components/App/styled';
import Board from '@/components/Board';
import { GameStateUpdater, StaticGameStateUpdater } from '@/components/GameStateUpdater';
import LanguageDropdown from '@/components/LanguageDropdown';
import StepTeam from '@/components/StepTeam';
import deepSeekApi from '@/services/api/deepSeekApi';
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
        <button
          onClick={async () => {
            try {
              const response = deepSeekApi.post('/chat/completions', {
                model: 'deepseek-chat',
                messages: [
                  {
                    role: 'user',
                    content:
                      'хочу протестировать твои возможности. Я начал игру, пешка на e4, остальные фигуры стоят на месте, хочу, чтобы ты ответил ходом в стиле Магнуса Карлсена и написал почему ты выбрал такой ход',
                  },
                ],
              });
              console.log('response', response);
            } catch (error) {
              console.log('errorerrorerror', error);
            }
          }}
        >
          Жмакааай!!!
        </button>
      </StyledApp>
    </>
  );
}

export default App;

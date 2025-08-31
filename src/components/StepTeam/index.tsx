import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';

function StepTeam() {
  const { t } = useTranslation();

  const gameEngine = useAppSelector(({ gameEngine }) => gameEngine);

  return <h2>{t(`team.${gameEngine.activeTeam}`)}</h2>;
}

export default StepTeam;

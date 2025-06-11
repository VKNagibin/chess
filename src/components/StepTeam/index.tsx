import { t } from 'i18next';

import { useAppSelector } from '@/redux/hooks';

function StepTeam() {
  const currentStepTeam = useAppSelector(({ currentTeam }) => currentTeam.currentTeam);

  return <h2>{t(`team.${currentStepTeam}`)}</h2>;
}

export default StepTeam;

import { useTranslation } from 'react-i18next';

import { useAppSelector } from '@/store/hooks';

function StepTeam() {
  const { t } = useTranslation();

  const currentStepTeam = useAppSelector(({ cells }) => cells.currentTeam);

  return <h2>{t(`team.${currentStepTeam}`)}</h2>;
}

export default StepTeam;

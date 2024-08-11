import { useUnit } from 'effector-react';
import { t } from 'i18next';

import { $currentStepTeam } from '@/stores/team';

function StepTeam() {
  const currentStepTeam = useUnit($currentStepTeam);

  return <h1>{t(`team.${currentStepTeam}`)}</h1>;
}

export default StepTeam;

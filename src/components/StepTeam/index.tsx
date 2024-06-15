import { useUnit } from 'effector-react';

import { $currentStepTeam } from '@/stores/team';

function StepTeam() {
  const currentStepTeam = useUnit($currentStepTeam);

  return <h1>{currentStepTeam}</h1>;
}

export default StepTeam;

import { useTranslation } from 'react-i18next';

import classes from '@/components/StepTeam/team.module.scss';
import { useAppSelector } from '@/store/hooks';

function StepTeam() {
  const { t } = useTranslation();

  const activeTeam = useAppSelector(({ gameEngine }) => gameEngine.activeTeam);

  return <p className={classes.team}>{t(`team.${activeTeam}`)}</p>;
}

export default StepTeam;

import { useTranslation } from 'react-i18next';

import classes from '@/components/StepTeam/team.module.scss';
import { useAppSelector } from '@/store/hooks';

function StepTeam() {
  const { t } = useTranslation();

  const { activeTeam, userTeam } = useAppSelector(({ gameEngine }) => gameEngine);

  const getTeamColorClasses = () => [classes.teamColor, classes[activeTeam]].join(' ');

  const text = activeTeam === userTeam ? t('step.own') : t('step.enemy');

  return (
    <div className={classes.container}>
      <div className={getTeamColorClasses()} />
      {<p className={classes.team}>{text}</p>}
    </div>
  );
}

export default StepTeam;

import { t } from 'i18next';
import { FunctionComponent, useState } from 'react';

import { FigureTeam } from '@/entities/Cell/enums';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

import classes from './index.module.scss';

const WelcomeModal: FunctionComponent<ModalComponentProps<FigureTeam>> = ({ submit }) => {
  const [team, setTeam] = useState<FigureTeam>(FigureTeam.WHITE);
  return (
    <ModalTemplate
      buttons={
        <ModalButton items={[{ onClick: () => submit(team), text: t('confirm') }]} />
      }
      close={() => submit(team)}
      title={t('welcomeModal.title')}
    >
      <div className={classes.container}>
        <button
          className={`${
            team === FigureTeam.WHITE ? classes.selected : ''
          } ${`${classes.teamButton} ${classes.white}`}`}
          onClick={() => {
            setTeam(FigureTeam.WHITE);
          }}
        >
          {t('team.white')}
        </button>
        <button
          className={`${
            team === FigureTeam.BLACK ? classes.selected : ''
          } ${`${classes.teamButton} ${classes.black}`}`}
          onClick={() => {
            setTeam(FigureTeam.BLACK);
          }}
        >
          {t('team.black')}
        </button>
      </div>
    </ModalTemplate>
  );
};

export default WelcomeModal;

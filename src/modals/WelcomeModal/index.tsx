import { t } from 'i18next';
import { FunctionComponent, memo, useCallback, useMemo, useState } from 'react';

import { FigureTeam } from '@/entities/Cell/enums';
import { Dropdown } from '@/shared/components/Dropdown';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';
import { noneFn } from '@/shared/types';
import { DifficultyLevel } from '@/store/slices/cells/types';

import classes from './index.module.scss';
import getDifficultyOptions from './utils/getDifficultyOptions';

const WelcomeModal: FunctionComponent<ModalComponentProps<FigureTeam>> = ({ submit }) => {
  const [team, setTeam] = useState<FigureTeam>(FigureTeam.WHITE);
  const [selectedValue, setSelectedValue] = useState<DifficultyLevel>(
    DifficultyLevel.BEGINNER,
  );

  const options = useMemo(() => getDifficultyOptions(team), [team]);
  const onClose = useCallback(() => submit(team), [team, submit]);

  const modalButtons = useMemo(
    () => [{ onClick: () => submit(team), text: t('confirm'), type: 'submit' }],
    [team, submit],
  );

  return (
    <ModalTemplate
      buttons={<ModalButton items={modalButtons} />}
      close={onClose}
      title={t('welcomeModal.title')}
    >
      <div className={classes.body}>
        <div className={classes.horizontalItemConteiner}>
          <h4 className={classes.typography}>{t('team.one')}:</h4>
          <div className={classes.configItemValues}>
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
        </div>
        <div className={classes.verticalItemConteiner}>
          <h4 className={classes.typography}>{t('difficulty.level')}:</h4>
          <Dropdown
            options={options}
            value={selectedValue}
            onChange={setSelectedValue as noneFn}
            placeholder={t('difficulty.placeholder')}
            disabled={false}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default memo(WelcomeModal);

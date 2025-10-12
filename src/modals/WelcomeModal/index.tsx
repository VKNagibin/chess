import { FunctionComponent, memo, useCallback, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FigureTeam } from '@/entities/Cell/enums';
import Cache from '@/services/Cache';
import { LanguagesKeysType } from '@/services/lang/i18n';
import { Dropdown } from '@/shared/components/Dropdown';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';
import { noneFn } from '@/shared/types';
import { DifficultyLevel } from '@/store/slices/cells/types';

import languagesOptions from './data/languagesOptions';
import classes from './index.module.scss';
import getDifficultyOptions from './utils/getDifficultyOptions';

const WelcomeModal: FunctionComponent<ModalComponentProps<FigureTeam>> = ({
  serviceProps,
  submit,
}) => {
  const [team, setTeam] = useState<FigureTeam>(FigureTeam.WHITE);
  const [difficultyLevel, setDifficultyLevel] = useState<DifficultyLevel>(
    DifficultyLevel.BEGINNER,
  );

  const { t, i18n } = useTranslation();

  const difficultyOptions = useMemo(() => getDifficultyOptions(team), [t, team]);

  const onClose = useCallback(() => submit(team), [team, submit]);

  const modalButtons = useMemo(
    () => [{ onClick: () => submit(team), text: t('confirm'), type: 'submit' }],
    [t, team, submit],
  );

  return (
    <ModalTemplate
      buttons={<ModalButton items={modalButtons} />}
      close={onClose}
      title={t('welcomeModal.title')}
      {...serviceProps}
    >
      <div className={classes.body}>
        <div className={classes.horizontalItemConteiner}>
          <h4 className={classes.typography}>{t('language.title')}:</h4>
          <Dropdown
            options={languagesOptions}
            f
            value={i18n.language}
            onChange={(value: LanguagesKeysType) => {
              i18n.changeLanguage(value);
              Cache.set('language', value);
            }}
            placeholder={t('language.title')}
            disabled={false}
          />
        </div>
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
            options={difficultyOptions}
            value={difficultyLevel}
            onChange={setDifficultyLevel as noneFn}
            placeholder={t('difficulty.placeholder')}
            disabled={false}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default memo(WelcomeModal);

import { FunctionComponent, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import { FigureTeam } from '@/entities/Cell/enums';
import Cache from '@/services/Cache';
import { LanguagesKeysType } from '@/services/lang/i18n';
import { Dropdown } from '@/shared/components/Dropdown';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';
import { useAppActions, useAppSelector } from '@/store/hooks';

import languagesOptions from './data/languagesOptions';
import classes from './index.module.scss';
import getDifficultyOptions from './utils/getDifficultyOptions';

const WelcomeModal: FunctionComponent<ModalComponentProps<FigureTeam>> = ({
  serviceProps,
  submit,
}) => {
  const { setUserTeam, setDifficultyLevel } = useAppActions();
  const { userTeam, difficultyLevel } = useAppSelector((state) => state.gameEngine);
  const { t, i18n } = useTranslation();

  const difficultyOptions = useMemo(() => getDifficultyOptions(userTeam), [t, userTeam]);

  const modalButtons = useMemo(
    () => [{ onClick: () => submit(), text: t('confirm'), type: 'submit' }],
    [t, submit],
  );

  return (
    <ModalTemplate
      buttons={<ModalButton items={modalButtons} />}
      close={submit}
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
                userTeam === FigureTeam.WHITE ? classes.selected : ''
              } ${`${classes.teamButton} ${classes.white}`}`}
              onClick={() => {
                setUserTeam(FigureTeam.WHITE);
              }}
            >
              {t('team.white')}
            </button>
            <button
              className={`${
                userTeam === FigureTeam.BLACK ? classes.selected : ''
              } ${`${classes.teamButton} ${classes.black}`}`}
              onClick={() => {
                setUserTeam(FigureTeam.BLACK);
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
            onChange={(value: string) => setDifficultyLevel(value)}
            placeholder={t('difficulty.placeholder')}
            disabled={false}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default memo(WelcomeModal);

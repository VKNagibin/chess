import { t } from 'i18next';
import { FunctionComponent, useState } from 'react';

import { FigureTeam } from '@/entities/Cell/enums';
import { Dropdown, DropdownOption } from '@/shared/components/Dropdown';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

import classes from './index.module.scss';

const options: DropdownOption[] = [
  { value: '1', label: 'Apple', icon: '🍎' },
  { value: '2', label: 'Banana', icon: '🍌' },
  { value: '3', label: 'Orange', icon: '🍊' },
  { value: '4', label: 'Grape', icon: '🍇' },
  { value: '5', label: 'Lemon', icon: '🍋' },
];

const WelcomeModal: FunctionComponent<ModalComponentProps<FigureTeam>> = ({ submit }) => {
  const [team, setTeam] = useState<FigureTeam>(FigureTeam.WHITE);
  const [selectedValue, setSelectedValue] = useState<string>();

  return (
    <ModalTemplate
      buttons={
        <ModalButton items={[{ onClick: () => submit(team), text: t('confirm') }]} />
      }
      close={() => submit(team)}
      title={t('welcomeModal.title')}
    >
      <div className={classes.body}>
        <div className={classes.horizontalItemConteiner}>
          <h4 className={classes.typography}>Команда:</h4>
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
          <h4 className={classes.typography}>Уровень сложности:</h4>
          <Dropdown
            options={options}
            value={selectedValue}
            onChange={setSelectedValue}
            placeholder="Select a fruit"
            disabled={false}
          />
        </div>
      </div>
    </ModalTemplate>
  );
};

export default WelcomeModal;

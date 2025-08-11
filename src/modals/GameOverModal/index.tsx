import { t } from 'i18next';
import { FunctionComponent } from 'react';

import { FigureTeam } from '@/entities/Cell/enums';
import ModalButtons from '@/shared/components/Modal/ModalButtons';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

interface ModalProps {
  team: FigureTeam;
}

const GameOverModal: FunctionComponent<ModalComponentProps<void> & ModalProps> = ({
  submit,
  team,
}) => {
  return (
    <ModalTemplate
      buttons={<ModalButtons items={[{ onClick: submit, text: t('gotIt') }]} />}
      title={t('gameOverModal.title', { team: t(`team.${team}`) })}
    ></ModalTemplate>
  );
};

export default GameOverModal;

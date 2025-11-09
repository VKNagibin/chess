import { FunctionComponent } from 'react';
import { useTranslation } from 'react-i18next';

import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

const GameOverModal: FunctionComponent<ModalComponentProps<void>> = ({
  submit,
  team,
  serviceProps,
}) => {
  const { t } = useTranslation();

  return (
    <ModalTemplate
      buttons={
        <ModalButton items={[{ onClick: submit, type: 'submit', text: t('gotIt') }]} />
      }
      title={t('gameOverModal.title', { team: t(`team.${team}`) })}
      {...serviceProps}
    ></ModalTemplate>
  );
};

export default GameOverModal;

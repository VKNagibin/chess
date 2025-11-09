import { FunctionComponent, useState } from 'react';
import { useTranslation } from 'react-i18next';

import { FigureType } from '@/entities/Cell/enums';
import FiguresList from '@/modals/PawnMutateModal/components/FiguresList';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

const PawnMutateModal: FunctionComponent<ModalComponentProps<FigureType>> = ({
  cellId,
  submit,
  serviceProps,
}) => {
  const [selectedType, setSelectedType] = useState<FigureType>(FigureType.QUEEN);

  const { t } = useTranslation();

  return (
    <ModalTemplate
      buttons={
        <ModalButton
          items={[
            {
              text: t('confirm'),
              type: 'submit',
              onClick: () => submit(selectedType),
            },
          ]}
        />
      }
      title={t('pawnMutationModal.title', { cellId })}
      {...serviceProps}
    >
      <FiguresList selectedType={selectedType} onSelectFigure={setSelectedType} />
    </ModalTemplate>
  );
};

export default PawnMutateModal;

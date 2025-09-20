import { t } from 'i18next';
import { FunctionComponent, useState } from 'react';

import { FigureType } from '@/entities/Cell/enums';
import FiguresList from '@/modals/PawnMutateModal/components/FiguresList';
import ModalButton from '@/shared/components/Modal/ModalButton';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

interface IPawnMutateModalProps {
  cellId: string;
}

const PawnMutateModal: FunctionComponent<
  ModalComponentProps<FigureType> & IPawnMutateModalProps
> = ({ cellId, submit }) => {
  const [selectedType, setSelectedType] = useState<FigureType>(FigureType.QUEEN);

  return (
    <ModalTemplate
      buttons={
        <ModalButton
          items={[
            {
              text: t('confirm'),
              onClick: () => submit(selectedType),
            },
          ]}
        />
      }
      title={t('pawnMutationModal.title', { cellId })}
    >
      <FiguresList selectedType={selectedType} onSelectFigure={setSelectedType} />
    </ModalTemplate>
  );
};

export default PawnMutateModal;

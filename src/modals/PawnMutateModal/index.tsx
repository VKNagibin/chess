import { t } from 'i18next';
import { FunctionComponent, useState } from 'react';

import { FigureType } from '@/entities/Cell/enums';
import FiguresList from '@/modals/PawnMutateModal/components/FiguresList';
import ModalButtons from '@/shared/components/Modal/ModalButtons';
import ModalTemplate from '@/shared/components/Modal/ModalTemplate';
import { ModalComponentProps } from '@/shared/components/Modal/types';

interface IPawnMutateModalProps {
  cellId: string;
}

interface IModalResult {
  selectedType: FigureType;
}

const PawnMutateModal: FunctionComponent<
  ModalComponentProps<IModalResult> & IPawnMutateModalProps
> = ({ cellId, submit }) => {
  const [selectedType, setSelectedType] = useState<FigureType>(FigureType.QUEEN);

  return (
    <ModalTemplate
      buttons={
        <ModalButtons
          items={[
            {
              text: t('confirm'),
              onClick: () => submit({ selectedType }),
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

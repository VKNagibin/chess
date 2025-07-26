import { t } from 'i18next';
import { FunctionComponent, useState } from 'react';

import { FigureType } from '@/entities/Cell/enums';
import FiguresList from '@/modals/PawnMutateModal/components/FiguresList';
import classes from '@/modals/PawnMutateModal/index.module.css';
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
        <div className={classes.buttonsContainer}>
          <button
            className={classes.button}
            disabled={!selectedType}
            onClick={() => submit({ selectedType })}
          >
            {t('pawnMutationModal.submitButton')}
          </button>
        </div>
      }
      title={t('pawnMutationModal.title', { cellId })}
    >
      <FiguresList selectedType={selectedType} onSelectFigure={setSelectedType} />
    </ModalTemplate>
  );
};

export default PawnMutateModal;

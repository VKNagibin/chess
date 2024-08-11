import ModalContainer from '@components/ModalContainer';
import FiguresList from '@components/PawnMutateModal/components/FiguresList';
import { StyledButton, StyledButtonsContainer } from '@components/PawnMutateModal/styled';
import usePawnMutateModal from '@components/PawnMutateModal/usePawnMutateModal';
import { t } from 'i18next';

const PawnMutateModal = () => {
  const { isOpen, selectedType, entityForMutation, setSelectedType, onSubmit } =
    usePawnMutateModal();

  if (!isOpen || !entityForMutation) return null;

  return (
    <ModalContainer
      buttons={
        <StyledButtonsContainer>
          <StyledButton disabled={!selectedType} onClick={onSubmit}>
            {t('pawnMutationModal.submitButton')}
          </StyledButton>
        </StyledButtonsContainer>
      }
      title={t('pawnMutationModal.title', { cellId: entityForMutation.cellId })}
    >
      <FiguresList selectedType={selectedType} onSelectFigure={setSelectedType} />
    </ModalContainer>
  );
};

export default PawnMutateModal;

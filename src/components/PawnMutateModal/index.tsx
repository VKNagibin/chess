import ModalContainer from '_comp/ModalContainer';
import FiguresList from '_comp/PawnMutateModal/components/FiguresList';
import { StyledButton, StyledButtonsContainer } from '_comp/PawnMutateModal/styled';
import usePawnMutateModal from '_comp/PawnMutateModal/usePawnMutateModal';
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

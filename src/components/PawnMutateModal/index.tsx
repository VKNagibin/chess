import ModalContainer from '@components/ModalContainer';
import FiguresList from '@components/PawnMutateModal/components/FiguresList';
import { StyledButton, StyledButtonsContainer } from '@components/PawnMutateModal/styled';
import usePawnMutateModal from '@components/PawnMutateModal/usePawnMutateModal';

const PawnMutateModal = () => {
  const { isOpen, selectedType, entityForMutation, setSelectedType, onSubmit } =
    usePawnMutateModal();

  if (!isOpen || !entityForMutation) return null;

  return (
    <ModalContainer
      buttons={
        <StyledButtonsContainer>
          <StyledButton disabled={!selectedType} onClick={onSubmit}>
            Подтвердить
          </StyledButton>
        </StyledButtonsContainer>
      }
      title={`Выберите фигуру взамен пешки ${entityForMutation.cellId}`}
    >
      <FiguresList selectedType={selectedType} onSelectFigure={setSelectedType} />
    </ModalContainer>
  );
};

export default PawnMutateModal;

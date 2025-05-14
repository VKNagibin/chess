import figuresSvg from '@img/figures';
import { useUnit } from 'effector-react';
import { ReactSVG } from 'react-svg';

import { getFigureSvgName } from '@/components/Cell/utils';
import {
  StyledFigureButton,
  StyledFiguresContainer,
} from '@/components/PawnMutateModal/components/FiguresList/styled';
import { FigureType } from '@/entities/Cell/enums';
import { $mutatingEntity } from '@/stores/pawnMutateModal';

const figuresTypesList = [
  FigureType.BISHOP,
  FigureType.ROOK,
  FigureType.KNIGHT,
  FigureType.QUEEN,
];

interface IProps {
  onSelectFigure: (type: FigureType) => void;
  selectedType: FigureType | null;
}

const FiguresList = ({ selectedType, onSelectFigure }: IProps) => {
  const entityForMutation = useUnit($mutatingEntity);

  if (!entityForMutation) return null;

  return (
    <StyledFiguresContainer>
      {figuresTypesList.map((type) => (
        <StyledFigureButton
          key={type}
          $isSelected={selectedType === type}
          onClick={() => {
            onSelectFigure(type);
          }}
        >
          <ReactSVG
            src={figuresSvg[getFigureSvgName({ type, team: entityForMutation.team })]}
          />
        </StyledFigureButton>
      ))}
    </StyledFiguresContainer>
  );
};

export default FiguresList;

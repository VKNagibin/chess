import { getFigureSvgName } from '_comp/Cell/utils';
import LazySvg from '_comp/LazySvg';
import {
  StyledFigureButton,
  StyledFiguresContainer,
} from '_comp/PawnMutateModal/components/FiguresList/styled';
import { useUnit } from 'effector-react';
import { useState } from 'react';

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
          <LazySvg name={getFigureSvgName({ type, team: entityForMutation.team })} />
        </StyledFigureButton>
      ))}
    </StyledFiguresContainer>
  );
};

export default FiguresList;

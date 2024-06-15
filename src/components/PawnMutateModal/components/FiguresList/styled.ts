import styled from 'styled-components';

export const StyledFiguresContainer = styled.button`
  border: none;
  background-color: transparent;
  width: 100%;
  justify-content: space-around;
  display: flex;
`;

export const StyledFigureButton = styled.button<{ $isSelected: boolean }>`
  padding: 4px 8px;
  display: flex;
  border-radius: 12px;
  cursor: pointer;
  justify-content: center;
  align-items: center;
  border: none;
  background-color: ${({ $isSelected }) => ($isSelected ? 'aquamarine' : 'transparent')};

  &:hover {
    background-color: ${({ $isSelected }) =>
      $isSelected ? 'aquamarine' : 'rgba(127, 255, 212, 0.36)'};
  }
`;

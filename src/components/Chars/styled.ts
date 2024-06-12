import styled from 'styled-components';

export const StyledChars = styled.ul<{ $append?: boolean }>`
  position: absolute;
  width: 100%;
  height: 80px;
  display: flex;
  bottom: ${(props) => (props.$append ? '-80px' : 'auto')};
  top: ${(props) => (props.$append ? 'auto' : '-80px')};
`;

export const StyledChar = styled.li`
  list-style: none;
  width: 80px;
  height: inherit;
  font-weight: 700;
  font-size: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

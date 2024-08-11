import styled from 'styled-components';

export const StyledOverlay = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
  background-color: rgba(0, 0, 0, 0.4);
`;

export const StyledModalCard = styled.div`
  position: relative;
  padding: 24px;
  gap: 48px;
  display: flex;
  flex-direction: column;
  background-color: antiquewhite;
  width: 600px;
  border-radius: 10px;
  min-height: 50px;
`;

export const StyledHeader = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const StyledCrossButton = styled.button`
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  border-radius: 6px;
  background-color: beige;

  &:after {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    inset: 0;
    content: 'x';
  }
`;

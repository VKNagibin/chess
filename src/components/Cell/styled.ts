import styled from 'styled-components';

export const StyledCell = styled.button`
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: 2px solid black;
  border: none;

  &.white {
    background-color: white;
  }

  &.black {
    background-color: rgb(218, 151, 96);
  }

  &.filled:hover {
    cursor: pointer;
    background-color: rgba(250, 241, 120, 0.397);
  }

  &.filled:focus {
    background-color: rgba(218, 241, 10, 0.397);
  }

  &.selected {
    background-color: #03ffe5 !important;
  }

  &.step {
    background-color: rgb(124 255 124) !important;
  }

  &.step:hover {
    background-color: #93f993 !important;
  }

  &.kill {
    background-color: #e10000 !important;
  }

  &.castling {
    background-color: #a17ffa !important;
  }
`;
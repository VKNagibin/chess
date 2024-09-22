import blackWood from '_img/blackWood.jpg';
import whiteWood from '_img/whiteWood.png';
import styled from 'styled-components';

export const StyledCell = styled.button`
  position: relative;
  border-radius: 2px;
  width: 80px;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;

  &.white {
    background: url(${whiteWood});
  }

  &.black {
    background: url(${blackWood});
  }

  &.currentTeam {
    cursor: pointer;
  }

  &.filled:hover {
    cursor: pointer;
    background: rgb(166, 143, 124);
  }

  &.filled:hover.black {
    cursor: pointer;
    background: url(${blackWood});
  }

  &.filled:hover.white {
    cursor: pointer;
    background: url(${whiteWood});
  }

  &.selected {
    &::after {
      content: '';
      position: absolute;
      bottom: 4px;
      border-radius: 8px;
      right: 16px;
      left: 16px;
      height: 4px;
      background: black;
    }
  }

  &.step::after {
    will-change: transform;
    transition: transform 0.3s;
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    border-radius: 50%;
    width: 16px;
    height: 16px;
    background: radial-gradient(circle, rgb(0 0 0) 54%, rgb(235 203 161) 61%);
    transform: translate(-50%, -50%);
  }

  &.step:hover {
    &::after {
      transform: translate(-50%, -50%) scale(1.2);
    }
  }

  &.kill {
    &::after {
      will-change: transform;
      position: absolute;
      transition: transform 0.3s;
      content: '';
      bottom: 15px;
      border-radius: 2px;
      right: -6px;
      width: 45px;
      transform: rotate(136deg);
      background: #6f2626;
      height: 3px;
    }
    }

    &:hover {
      border-width: 6px;
    }
  }

  &.castling {
    &::after {
      will-change: transform;
      transition: transform 0.3s;
      content: 'C';
      position: absolute;
      top: 50%;
      font-weight: 800;
      font-size: 24px;
      left: 50%;
      transform: translate(-50%, -50%);
    }

    &:hover {
      &::after {
        transform: translate(-50%, -50%) scale(1.2);
      }
    }
  }
`;

import { createGlobalStyle } from 'styled-components';

export const GlobalStyles = createGlobalStyle`
  * {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }
  
  #root {
      min-height: 100vh;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      background-color: rgb(231 212 186);
  }

  // TODO вынести в более подходящее место
  .figureIconContainer {
    position: relative;
    z-index: 100;
    will-change: transform;
    transition: transform .3s;

    &.kill:hover {
      transform: scale(1.05);
    }

    &.currentTeam:hover {
      transform: scale(1.05);
    } 
  }
  
  
  body {
    min-width: max-content;
    font-family: 'Roboto', sans-serif;
  }
  
`;

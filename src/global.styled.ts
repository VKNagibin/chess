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
  
  
  body {
    min-width: max-content;
    font-family: 'Roboto', sans-serif;
  }

  button {
      border: none;
      background: none;
  }

  
`;

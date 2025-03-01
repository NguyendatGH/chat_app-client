import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
 * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Poppins', Courier, monospace;
    color: ${({ theme }) => theme.palette.text}
  }


  #root {
    width: 100%;
    height: 100vh;
    background-color: ${({ theme }) => theme.palette.background.theme};
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    transition: background-color 0.3s ease-in-out;
  }

  body {
    background-color: ${({ theme }) => theme.palette.background.appBg};
    color: ${({ theme }) => theme.palette.text};
    transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
  }
`;

export default GlobalStyle;

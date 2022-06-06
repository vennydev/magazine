import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
*, *::before, *::after {
  box-sizing: border-box;
}

body {
  font-family: "Helvetica", "Arial", sans-serif;
  line-height: 1.5;
  background-color: aliceblue;
  height: 100vh;
  margin:0 auto;
}

`;

export default GlobalStyle;

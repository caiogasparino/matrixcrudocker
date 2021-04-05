import { createGlobalStyle } from 'styled-components';
import 'react-toastify/dist/ReactToastify.css';

export default createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }
  
  body {
    background: #4444440a;
    -webkit-font-smoothing: antialiased;
  }

  html, body, #root {
    height: 100%;
  }
  
  body, input, button {
    font: 16px "Poppins", sans-serif;
  }

  a {
    text-decoration: none;
    color: #4f4d4d;;
  }

  li {
    list-style: none;
  }
  
  button {
    cursor: pointer;
  }
`;

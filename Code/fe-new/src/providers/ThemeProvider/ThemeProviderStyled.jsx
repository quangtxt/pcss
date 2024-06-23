import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  /* width */
  ::-webkit-scrollbar {
    width: 5px;
    height: 10px;
    background-color: #f0f0f0;
    border-radius: 4px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: transparent; 
  }
  
  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #9d9d9d; 
    border-radius: 4px;
  }

  body{
    background: rgb(255, 255, 255);
  }
  body, html {
    max-width: 100vw;
    min-height: 100vh;
    scroll-behavior: smooth;
  }  
  *{
    box-sizing: border-box;
    padding: 0;
    margin: 0;
    font-family: Inter Tight, sans-serif;}
  h4{
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`

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
    background-color: #cddaf4;
    position: relative;
  }
  h4{
    font-size: 1rem;
    margin-bottom: 1rem;
  }
  /* @media screen and (max-width: 1024px){
    body{
      zoom: 0.8;
    }
  } */
`

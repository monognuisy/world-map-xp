import { Outlet } from 'react-router-dom';
import { createGlobalStyle } from 'styled-components';

import NotoColorEmojiFont from './font/NotoColorEmoji-Regular.ttf';

export default function App() {
  return (
    <>
      <GlobalStyle />
      <Outlet />
    </>
  );
}

const GlobalStyle = createGlobalStyle`
  :root {
    --line-color: #999999;
    --background-color: #EBEBE8;
    height: 100vh;
    
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    font-family: Pretendard, -apple-system, BlinkMacSystemFont, 'Noto Color Emoji',
    'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', 'Cantarell', 'Fira Sans',
    'Droid Sans', 'Helvetica Neue', sans-serif;
    background-color: var(--background-color);
    height: 100vh;

  }
  //
  // * {
  //   margin: 0;
  //   padding: 0;
  //   box-sizing: border-box;
  //   font-family: caveat;
  // }

  a {
    color: inherit;
    text-decoration: none;
  }

  a:hover {
    text-decoration: none;
  }

  li {
    list-style: none;
  }

  button {
    background-color: white;
    border: none;
  }

  input {
    border: none;
  }

  h1 {
    font-size: 17px;
    font-weight: 500;
  }
  h2 {
    font-size: 16px;
    font-weight: 500;
  }
  h3 {
    font-size: 15px;
    font-weight: 400;
  }
  p {
    font-size: 14px;
  }
  span {
    font-size: 12px;
  }
  // @font-face {
  //   font-family: "bold";
  //   src: url("/font/AnonymousPro-Bold.ttf");
  //   font-display: swap;
  // }
  // @font-face {
  //   font-family: "regular";
  //   src: url("/font/AnonymousPro-Regular.ttf");
  //   font-display: swap;
  // }
  // @font-face {
  //   font-family: "caveat";
  //   src: url("/font/Caveat-VariableFont_wght.ttf");
  //   font-display: swap;
  // }

  @font-face {
    font-family: "Noto Color Emoji";
    src: url("${NotoColorEmojiFont}");
    font-display: swap;
  }

`;

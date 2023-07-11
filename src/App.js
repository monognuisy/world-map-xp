import { Outlet } from "react-router-dom";
import { createGlobalStyle } from "styled-components";


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
    
  }
  body {
    padding: 0;
    margin: 0;
    font-size: 16px;
    background-color: var(--background-color);
    height: 100vh;
  }
  //
  //* {
  //  margin: 0;
  //  padding: 0;
  //  box-sizing: border-box;
  //  font-family: medium;
  //}
  //
  //a {
  //  color: inherit;
  //  text-decoration: none;
  //}
  //
  //a:hover {
  //  text-decoration: none;
  //}
  //
  //li {
  //  list-style: none;
  //}
  //
  //button {
  //  background-color: white;
  //  border: none;
  //}
  //
  //input {
  //  border: none;
  //}
  //
  //h1 {
  //  font-size: 17px;
  //  font-weight: 500;
  //}
  //h2 {
  //  font-size: 16px;
  //  font-weight: 500;
  //}
  //h3 {
  //  font-size: 15px;
  //  font-weight: 400;
  //}
  //p {
  //  font-size: 14px;
  //}
  //span {
  //  font-size: 12px;
  //}


`;

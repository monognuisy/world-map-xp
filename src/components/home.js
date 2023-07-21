import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Login from "./login";

function Home() {
  return (
    <HomeWrapper>
      <div className="home-start">
        <Link to="/map">
          <h1>Start</h1>
        </Link>
      </div>
      <div className="home-login">
        <Login />
      </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  background-image: url("https://images.pexels.com/photos/220201/pexels-photo-220201.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2");
  background-size: cover;
  width: 100vw;
  height: 100vh;

  .home-start h1 {
    font-size: 64px;

    padding: 100px;
  }
  .home-login h1 {
    font-size: 64px;
  }
`;

export default Home;

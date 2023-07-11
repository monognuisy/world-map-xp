import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

function Home(props) {
  return (
    <HomeWrapper>
      <Link to="/map">
        <div>Home</div>
      </Link>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 60px;
`;

export default Home;

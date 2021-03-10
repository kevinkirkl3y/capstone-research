import React from 'react';
import styled from 'styled-components';
//import { Link } from "react-router-dom";
import './../index.css';
const SpotCheckHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: blue
`
const HeaderBox = styled.div`
width: 100%;
border: 2px solid #ccc;
margin: 2rem auto;
`;

// const HomeButton = styled.Link`
//   font-size: 24px;
//   text-align: center;
//   color: blue

function Header() {
  return(
    <>
      <HeaderBox >
        <SpotCheckHeader>Spot Check</SpotCheckHeader>
        {/* <Link to='/'>Home</Link> */}

      </HeaderBox>
    </>
  )
}

export default Header;
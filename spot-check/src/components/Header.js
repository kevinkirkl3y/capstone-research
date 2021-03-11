import React from 'react';
import styled from 'styled-components';
import './../index.css';
//import { Link } from "react-router-dom";

import './../index.css';
import  Jumbotron from 'react-bootstrap/Jumbotron';
const SpotCheckHeader = styled.h1`
  font-size: 100px;
  text-align: center;
  color: slateGray;
  
  
`
// const HeaderBox = styled.div`
// width: 100%;
// border: 2px solid #ccc;
// margin: 2rem auto;
// `;

// const HomeButton = styled.Link`
//   font-size: 24px;
//   text-align: center;
//   color: blue

function Header() {

  return(
    <>
      <Jumbotron fluid>
        <SpotCheckHeader className="header">Spot Check</SpotCheckHeader>
        {/* <h1>Spot Check</h1> */}
        {/* <Link to='/'>Home</Link> */}

      </Jumbotron>
    </>
  )
}

export default Header;
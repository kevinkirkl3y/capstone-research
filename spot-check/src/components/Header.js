import React from 'react';
import styled from 'styled-components';
import './../index.css';
import BackgroundSlider from 'react-background-slider';
import image1 from './assets/Image1.jpeg';
import image2 from './assets/Image2.jpeg';
import image3 from './assets/Image3.jpeg';
//import { Link } from "react-router-dom";

import './../index.css';
const SpotCheckHeader = styled.h1`
  font-size: 100px;
  text-align: center;
  color: slateGray; 
`


function Header() {

  return(
    <>
      
        <BackgroundSlider 
        images={[image1, image2, image3 ]}
        duration={8}
        transition={2}/>
        <SpotCheckHeader className="header">Spot Check</SpotCheckHeader>
        {/* <h1>Spot Check</h1> */}
        {/* <Link to='/'>Home</Link> */}

     
    </>
  )
}

export default Header;
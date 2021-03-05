import React from 'react';
import styled from 'styled-components';

const SpotCheckHeader = styled.h1`
  font-size: 24px;
  text-align: center;
  color: blue
`
function Header() {
  return(
    <>
      <SpotCheckHeader>Spot Check</SpotCheckHeader>

    </>
  )
}

export default Header;
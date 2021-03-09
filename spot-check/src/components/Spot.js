import React from 'react';
import PropTypes from 'prop-types';

function Spot(props) {
  
  return(
    <>
    <h1>{props.name}</h1>
    <p>{props.features}</p>
    <p>{props.bustLevel}</p>
    </>
  )
  
}
Spot.propTypes = {
  name: PropTypes.string,
  features: PropTypes.string,
  bustLevel: PropTypes.string,
  location: PropTypes.object,

}

export default Spot
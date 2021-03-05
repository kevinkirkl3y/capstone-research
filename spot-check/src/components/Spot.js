import React from 'react';
import PropTypes from 'prop-types';

function Spot(props) {
  
  return(
    <>
    <h1>spot</h1>
    </>
  )
  
}
Spot.propTypes = {
  name: PropTypes.string,
  features: PropTypes.string,
  bustLevel: PropTypes.number,
  location: PropTypes.object,

}

export default Spot
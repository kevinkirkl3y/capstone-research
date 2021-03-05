import React from 'react'
import SpotMap from './SpotMap';
import { connect } from 'react-redux';
import { withFirestore, isLoaded } from 'react-redux-firebase';
import firebase from './../firebase';


class SpotControl extends React.Component {
  render() {
  

    
    return (
      <>
        <SpotMap/>
      </>
    )
  }
}

const mapStateToProps = state => {
  return{
    spotFormVisible: state.spotFormVisible,
    spotList: state.spotList,
    coordinates: state.coordinates,
    isMarkerShown: state.isMarkerShown,
    markerPosition: state.markerPosition
  }
}
SpotControl = connect(mapStateToProps)(SpotControl);
export default withFirestore(SpotControl);
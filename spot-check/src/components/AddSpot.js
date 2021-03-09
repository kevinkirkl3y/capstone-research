import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
//import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import * as c from './../actions/ActionTypes';


function AddSpot(props) {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [currentPosition, setCurrentPosition] = useState({});
  

  const mapStyles = {
    height: '50vh',
    width: "50%"
  }
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  }
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })
    dispatch({type: c.ADD_COORDINATES, location: currentPosition})
    
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  
  
   function addSpotToFirestore(event) {
    event.preventDefault();
    props.onNewSpotCreation();

    return firestore.collection('spots').add(
      {
        name: event.target.name.value,
        features: event.target.features.value,
        bustLevel: event.target.bustLevel.value,
        location: currentPosition
        //creatorId: // add auth capabilities to require sign in to create spots
      }
    )
  }
  return (
    <>
      
      <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}>
        <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center = {currentPosition}>
        {
          currentPosition.lat ?
            <Marker
              position={currentPosition}
              onDragEnd={(e) => onMarkerDragEnd(e)}
              draggable={true} /> :
            null
            
        }

        {console.log(currentPosition)}
        </GoogleMap>
      </ LoadScript>
      <form onSubmit={addSpotToFirestore}>
        <label htmlFor='name'>Name:</label><br/>
        <input type='text' name='name' /><br/>
        <label htmlFor='features'>Features:</label><br/>
        <input type='textarea' name='features' /><br/>
        <label htmlFor='bustLevel'>Bust Level:</label><br/>
        <input type='range' min="1" max="5" name='bustLevel'/><br/>
        
        
        
        <button type='submit'>Submit</button>
      </form>

    </>
  )
}
AddSpot.propTypes = {
  addSpotToFirestore: PropTypes.func

}
export default AddSpot;

{/* <input type='radio' value="1" name='bustLevel'>1</input>
        <input type='radio' value="2" name='bustLevel'>2</input>
        <input type='radio' value="3" name='bustLevel'>3</input>
        <input type='radio' value="4" name='bustLevel'>4</input>
        <input type='radio' value="5" name='bustLevel'>5</input> */}
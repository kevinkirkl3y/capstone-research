import React, { useState, useEffect, componentDidMount } from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
//import firebase from 'firebase/app';
import { useDispatch } from 'react-redux';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import * as c from './../actions/ActionTypes';
import {toggleForm} from './../actions/index';
import { Container } from 'react-bootstrap';


function AddSpot(props) {
  let action;
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [currentPosition, setCurrentPosition] = useState({});
  

  const returnHome= () => {
    props.returnHome();
  }
  //const defaultPosition = setCurrentPosition(currentPosition);
  
  const mapStyles = {
    height: '50vh',
    width: "50%"
  }
  function defaultCenter() {
    
    if (Object.keys(currentPosition).length === 0) {
      setCurrentPosition({ lat: 45.5051, lng: -122.6750 });
      dispatch({type: c.ADD_COORDINATES, location: currentPosition});
      return currentPosition;
    } else {
      dispatch({type: c.ADD_COORDINATES, location: currentPosition});
      return currentPosition;
    }
  }
  const success = position => {
    const currentPosition = {
      lat: position.coords.latitude,
      lng: position.coords.longitude
    }
    setCurrentPosition(currentPosition);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  const onMarkerDragEnd = (e) => {
    const lat = e.latLng.lat();
    const lng = e.latLng.lng();
    setCurrentPosition({ lat, lng })
    dispatch({type: c.ADD_COORDINATES, location: currentPosition})
  }
  
  
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
  
  
  

 
  return(
    <>
      <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}>
        <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center = {defaultCenter()}>
        {   
          currentPosition.lat ? 
          <Marker
            position={currentPosition}
            onDragEnd={(e) => onMarkerDragEnd(e)}
            draggable={true} /> :
            null    
        }
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
      <button onClick={returnHome}>Back to spot map</button>
    </>
  )
  

}
AddSpot.propTypes = {
  addSpotToFirestore: PropTypes.func

}
export default AddSpot;

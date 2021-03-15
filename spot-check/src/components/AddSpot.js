import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import { useDispatch} from 'react-redux';
import { GoogleMap, LoadScript, Marker} from '@react-google-maps/api';
import * as c from './../actions/ActionTypes';
import Card from 'react-bootstrap/Card';
import './../index.css';
import styled from 'styled-components';
import { Button } from 'react-bootstrap';

const MapBox = styled.div`
width: flex;
border: 10px solid #717082;
marginLeft: 50%;
marginRight: 50%;
display: flex;
justifyContent: center;
alignItems: center;
`;



function AddSpot(props) {
  const dispatch = useDispatch();
  const firestore = useFirestore();
  const [currentPosition, setCurrentPosition] = useState({});
  
  // function defaultCenter(){
  //     dispatch({type: c.ADD_COORDINATES, location: currentPosition});
  //     return currentPosition;

  // }
  const returnHome= () => {
    props.returnHome();
    dispatch({type: c.ADD_COORDINATES, location: currentPosition});
    return currentPosition;
    
  }
  
  
  const mapStyles = {
    height: '50vh',
    width: "100%"
  }
  
  const success = position => {
    let currentPosition;
    if(!position.coords.latitude){
      currentPosition= {
        lat: 45.5051,
        lng: -122.6750
      };
     setCurrentPosition(currentPosition);
    }else{
      currentPosition = {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      };
      setCurrentPosition(currentPosition);
    }
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success)
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
      <Card 
      className="addSpotCard">
        <Button variant='secondary' onClick={returnHome}>Back to spot map</Button>
        <MapBox>
          {console.log(currentPosition)}
        <LoadScript
        googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}>
          <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center = {currentPosition}
          >
          
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
        </MapBox>
        
        <div className='addSpotForm'>
          <form onSubmit={addSpotToFirestore}>
            <label htmlFor='name'>Name:</label><br/>
            <input type='text' name='name' /><br/>
            <label htmlFor='features'>Features:</label><br/>
            <input type='textarea' name='features' /><br/>
            <label htmlFor='bustLevel'>Bust Level:</label><br/>
            <input type='range' min="1" max="5" name='bustLevel'/><br/>
            <Button variant='secondary' type='submit'>Submit</Button>
          </form>
          

        </div>
        </Card>

      </>
    )
  

}
AddSpot.propTypes = {
  addSpotToFirestore: PropTypes.func,
  defaultCenter: PropTypes.func

}
export default AddSpot;

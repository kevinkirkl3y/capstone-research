import React, { useState, useEffect } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import { useSelector } from 'react-redux'
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import Spot from './Spot';

const SpotMap = (props) => {
  const mapStyles = {
    height: '50vh',
    width: "50%"
  }
  const [currentPosition, setCurrentPosition] = useState({});
  
  useFirestoreConnect([
    {collection: 'spots'}
  ]);

  const spots = useSelector(state => state.firestore.ordered.spots)

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
  if(isLoaded(spots)) {
    return(
      <>
        {console.log(spots)}
        <LoadScript
        googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}>
          <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={13}
          center = {currentPosition}>
            {
              spots.map(spot => {
                return (
                  <Marker 
                  key={spot.name}
                  position={spot.location}/>
                )
              })
            }
          </GoogleMap>
        </ LoadScript>
        {spots.map((spot) => {
          {console.log(spot.name)}
          return <Spot
          name={spot.name}
          features={spot.features}
          bustLevel={spot.bustLevel}
          id={spot.id}
          key={spot.id}/>
        })}
      </>
  
    )
  } else {
    return (
      <>
      <h3>Loading</h3>
      </>
    )
  }
  
}
export default SpotMap;
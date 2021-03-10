import React, { useState, useEffect } from 'react';
import { GoogleMap,  LoadScript, Marker } from '@react-google-maps/api';
import { useSelector} from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import Spot from './Spot';
import styled from 'styled-components';

const MapBox = styled.div`
width: 50%;
border: 10px solid #717082;
align: center;
`;



const SpotMap = (props) => {
  const mapStyles = {
    height: '50vh',
    width: "100%"
  }
  
  const [currentPosition, setCurrentPosition] = useState({});
  
  useFirestoreConnect([
    {collection: 'spots'}
  ]);
  const spots = useSelector(state => state.firestore.ordered.spots)

  const success = position => {
    const currentPosition = {
      lat: parseFloat(position.coords.latitude),
      lng: parseFloat(position.coords.longitude)
    }
    setCurrentPosition(currentPosition);
  }
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(success);
  })
  const [ setSelected ] = useState({});
  
  
  const onSelect = spot => {
    setSelected(spot);
  }
  if(isLoaded(spots)) {
    return(
      <>
        <MapBox>
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
                    key={spot.id}
                    position={spot.location}
                    onClick={() => onSelect(spot)}
                    /> 
                  )
                })
              }
            </GoogleMap>
          </ LoadScript>
        </MapBox>
          {spots.map((spot) => {
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
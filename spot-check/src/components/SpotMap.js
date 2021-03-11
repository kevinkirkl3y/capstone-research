import React, { useState, useEffect } from 'react';
import { GoogleMap,  LoadScript, Marker } from '@react-google-maps/api';
import { useSelector} from 'react-redux';
import { useFirestoreConnect, isLoaded } from 'react-redux-firebase';
import styled from 'styled-components';
import Card from 'react-bootstrap/Card';

const MapBox = styled.div`
width: flex;
border: 10px solid #717082;
marginLeft: 50%;
marginRight: 50%;
display: flex;
justifyContent: center;
alignItems: center;
`;



const SpotMap = () => {
  const mapStyles = {
    height: '50vh',
    width: "100%"
  }
  
  const [currentPosition, setCurrentPosition] = useState({});
  
  useFirestoreConnect([
    {collection: 'spots'}
  ]);
  

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
  const spots = useSelector(state => state.firestore.ordered.spots)
  
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
            center = {{lat: parseFloat(currentPosition.lat), lng: parseFloat(currentPosition.lng)}}>
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
            return <Card key={spot.id}>
                  <Card.Body>
                    <Card.Title>{spot.name}</Card.Title>
                    <Card.Text>
                      Features: {spot.features}<br/>
                      Bust Level: {spot.bustLevel}<br/>
                    </Card.Text>
                  </Card.Body>
              </Card>
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
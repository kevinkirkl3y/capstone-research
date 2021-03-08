import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api'


function AddSpot(props) {
  const firestore = useFirestore();
  let locationIsEntered = false;

  const mapStyles = {
    height: '50vh',
    width: "50%"
  }
  const defaultCenter= {
    lat: 45.5051, lng: -122.6750 
  }

  function addSpotToFirestore(event) {
    event.preventDefault();
    //props.onNewSpotAddition;

    return firestore.collection('spots').add(
      {
        name: event.target.name.value,
        features: event.target.features.value,
        bustLevel: event.value.bustLevel.value,
        location: event.value.location.value,
        //creatorId: // add auth capabilities to require sign in to create spots
      }
    )
  }
    
    
  
  if (locationIsEntered === false) {

    return (
      <>
      <LoadScript
      googleMapsApiKey = {process.env.REACT_APP_MAPS_API_KEY}>
        <GoogleMap
        mapContainerStyle={mapStyles}
        zoom={13}
        center = {defaultCenter}>
        </GoogleMap>
      </ LoadScript>
      <button onClick={locationIsEntered = true}>Set Location </button>
      {console.log(locationIsEntered)}
      </>
    )
  }
  if(locationIsEntered === true) {
    return(
      <>
        {console.log(locationIsEntered)}
        <form onSubmit={addSpotToFirestore}>
          <label htmlFor='name'>Name:</label>
          <input type='text' name='name' />
          <label htmlFor='features'>Features</label>
          <input type='text' name='features' />
          <label htmlFor='bustLevel'>Bust Level:</label>
          <input type='range' min='1' max='10' step='1' name='bustLevel' />
          
          <button type='submit'>Submit</button>
        </form>
      </>
  
    )
  }

}
export default AddSpot;
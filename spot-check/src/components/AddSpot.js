import PropTypes from 'prop-types';
import { useFirestore } from 'react-redux-firebase';
import firebase from 'firebase/app';

function AddSpot(props) {
  const firestore = useFirestore();

  function addSpotToFirestore(event) {
    event.preventDefault();
    props.onNewSpotAddition;

    return firestore.collection('spots').add(
      {
        name: event.target.name.value,
        features: event.target.features.value,
        bustLevel: event.value.bustLevel.value,
        location: event.value.location.value,
        creatorId: // add auth capabilities to require sign in to create spots
      }
    )
  }
}
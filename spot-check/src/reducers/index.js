import formVisibleReducer from './form-visible-reducer';
import selectedSpotReducer from './selected-spot-reducer';
import spotReducer from './spot-reducer';
import spotEditReducer from './spot-edit-reducer';
import { combineReducers } from 'redux';
import { firestoreReducer } from 'redux-firestore';

const rootReducer = combineReducers({
  spotFormVisible: formVisibleReducer,
  selectedSpot: selectedSpotReducer,
  spotList: spotReducer,
  editing: spotEditReducer,
  firestore: firestoreReducer
})

export default rootReducer;
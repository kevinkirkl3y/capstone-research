import * as a from './../actions/index';


// eslint-disable-next-line
export default (state = {}, action) => {
  const { location, id } = action
  switch (action.type) {
    
    case a.deleteSpot:
      const newState = { ...state };
      delete newState[id];
      return newState;
    case a.addCoordinates():
      return Object.assign({}, state, {
        coordinates: {lat: action.coordinates.lat, lng: action.coordinates.lng},
        location
      });  
    default:
      return state; 
  }
}
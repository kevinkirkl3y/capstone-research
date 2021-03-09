import * as a from './../actions/index';



export default (state = {}, action) => {
  const { location, id } = action
  switch (action.type) {
    
    case a.deleteSpot:
      const newState = { ...state };
      delete newState[id];
      return newState;
    case a.addCoordinates():
      return Object.assign({}, state, {
        coordinates: action.coordinates,
        location
      });  
    default:
      return state; 
  }
}
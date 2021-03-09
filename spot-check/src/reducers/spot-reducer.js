import * as c from './../actions/ActionTypes';



export default (state = {}, action) => {
  const { location, id } = action
  switch (action.type) {
    
    case c.DELETE_SPOT:
      const newState = { ...state };
      delete newState[id];
      return newState;
    case c.ADD_COORDINATES:
      return Object.assign({}, state, {
        location: action.coordinates,
        location
      });  
    default:
      return state; 
  }
}
import * as c from './../actions/ActionTypes';

// eslint-disable-next-line
export default (state = null, action) => {
  switch(action.type){
    case c.SELECT_SPOT:
      return action.spot;
    case c.CLEAR_SELECT:
      return null;
    default:
      return state;
  }
}
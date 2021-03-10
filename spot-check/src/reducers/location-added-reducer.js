import * as c from './../actions/ActionTypes';

// eslint-disable-next-line
export default (state = false, action) => {
  switch (action.type) {
    case c.LOCATION_ADDED:
      return !state;
    default:
      return state;
  }
}
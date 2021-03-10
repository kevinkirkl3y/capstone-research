import * as c from './../actions/ActionTypes';

// eslint-disable-next-line
export default (state = false, action) => {
  switch (action.type) {
    case c.TOGGLE_EDIT:
      return !state;
    default:
      return state;
  }
}
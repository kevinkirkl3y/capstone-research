import * as c from './../actions/ActionTypes';

let initialState = {
  spotFormVisible: false,
    spotList: [],
    coordinates: {},
    isMarkerShown: false,
    markerPosition: null
}

export default (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
}
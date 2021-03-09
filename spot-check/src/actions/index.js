import * as c from './ActionTypes';

export const toggleForm = () => ({
  type: c.TOGGLE_FORM
});

export const selectSpot = (spot) => ({
  type: c.SELECT_SPOT,
  spot
});

export const clearSelect = () => ({
  type: c.CLEAR_SELECT
});
export const toggleEdit = () => ({
  type: c.TOGGLE_EDIT
});
export const locationAdded = () => ({
  type: c.LOCATION_ADDED
})
export const addCoordinates = (coordinates) => ({
  type: c.ADD_COORDINATES,
  coordinates
});
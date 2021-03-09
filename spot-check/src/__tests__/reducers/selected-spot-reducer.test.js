import selectedSpotReducer from '../../reducers/selected-spot-reducer';
import * as a from '../../actions/index';

describe('selectedSpotReducer', () => {

  let action;

  const spot = {
    name: "test",
    features: "test",
    bustLevel: 1,
    location: {lat: 45, lng: -122},
    id
  }
  test('Should return default state if no type is recognized', () => {
    expect(selectedSpotReducer({}, {type: null})).toEqual({});
  });
  test('Shoult return selected spot when SELECT_SPOT is called', () => {
    const action = a.selectSpot(spot);
    expect(selectedSpotReducer({}, action)).toEqual(spot);
  });
  test('Should return null when CLEAR_SELECT is called', () => {
    expect(selectedSpotReducer({}, action)).toEqual(null);
  })
})
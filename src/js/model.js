const state = {
  venues: [],
  coords: []
};

const setCoords = function(lat, lon) {
  state.coords = [lat, lon];
};

const appendVenues = function(venues) {
  state.venues = [...venues];
};

const resetState = function() {
  state.venues = [];
  state.coords = [];
};

export default { state, appendVenues, resetState, setCoords };

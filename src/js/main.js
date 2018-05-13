import FourSquareAPI from "./foursquare-api";
import helpers from "./helpers";
import view from "./view";
import model from "./model";
import mapbox from "./mapbox-api";

const getVenue = function() {
  if (model.state.venues.length === 0) {
    view.drawNoMoreVenues();
  } else {
    const nextVenue = model.state.venues.shift();
    mapbox.removeMarker();
    mapbox.setMarker(nextVenue);
  }
};

const getNext = function() {
  const nextBtn = helpers.qs("#next");

  helpers.$on(nextBtn, "click", getVenue);
};

const getVenues = function() {
  const field = helpers.qs("#radius");
  const lat = model.state.coords[0];
  const lon = model.state.coords[1];
  let r = 0;

  function fetchVenues(rad) {
    FourSquareAPI.getVenues(`${lat},${lon}`, rad)
      .then(res => {
        const { items } = res.response.groups[0];
        view.removeNotifs();
        model.appendVenues(items);
        getVenue();
        view.drawNextBtn();
        getNext();
      })
      .catch(err => {
        view.drawNotif(err.message);
      });
  }

  if (/[A-Z]/i.test(field.value)) {
    view.removeSpinner();
    view.drawNotif("Please enter a valid radius");
  } else if (field.value === "") {
    r = 10000;
    fetchVenues(r);
  } else {
    r = field.value * 1000;
    fetchVenues(r);
  }
};

const submitRadius = function() {
  const locBtn = helpers.qs("#drink");
  helpers.$on(locBtn, "click", getVenues);
};

const setCoords = function(pos) {
  const lon = pos.coords.longitude;
  const lat = pos.coords.latitude;
  model.resetState();
  model.setCoords(lat, lon);
  view.removeSpinner();
  mapbox.drawMap(model.state);
  submitRadius();
};

const getCoords = function() {
  helpers.qs("#map").innerHTML = "";
  view.drawSpinner();
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(setCoords, err => {
      view.removeSpinner();
      view.drawNotif("Please provide your location");
    });
  } else {
    view.removeSpinner();
    view.drawNotif("Geolocation is not supported on this browser");
  }
};

helpers.$on(document, "DOMContentLoaded", getCoords);

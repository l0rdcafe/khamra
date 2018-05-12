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
    mapbox.setMap(nextVenue, model.state);
  }
};

const getNext = function() {
  const nextBtn = helpers.qs("#next");

  helpers.$on(nextBtn, "click", getVenue);
};

const getVenues = function(pos) {
  const field = helpers.qs("#radius");
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  let r = 0;

  function fetchVenues() {
    FourSquareAPI.getVenues(`${lat},${lon}`, r)
      .then(res => {
        view.removeSpinner();
        const { items } = res.response.groups[0];
        view.removeNotifs();
        model.resetState();
        model.setCoords(lat, lon);
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
    fetchVenues();
  } else {
    r = field.value * 1000;
    fetchVenues();
  }
};

const getLocation = function() {
  const locBtn = helpers.qs("#drink");

  function getCoords() {
    helpers.qs("#map").innerHTML = "";
    view.drawSpinner();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getVenues, err => {
        view.removeSpinner();
        view.drawNotif("Please provide your location");
      });
    } else {
      view.removeSpinner();
      view.drawNotif("Geolocation is not supported on this browser");
    }
  }
  helpers.$on(locBtn, "click", getCoords);
};

helpers.$on(document, "DOMContentLoaded", getLocation);

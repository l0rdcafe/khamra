import FourSquareAPI from "./foursquare-api";
import helpers from "./helpers";
import view from "./view";
import model from "./model";
import mapbox from "./mapbox-api";

const getBars = function(pos) {
  const field = helpers.qs("#radius");
  const lat = pos.coords.latitude;
  const lon = pos.coords.longitude;
  let r = 0;

  function fetchBars() {
    FourSquareAPI.getBars(`${lat},${lon}`, r)
      .then(res => {
        view.removeSpinner();
        const { items } = res.response.groups[0];
        view.removeNotifs();
        model.resetState();
        model.setCoords(lat, lon);
        model.appendVenues(items);
        mapbox.setMap(model.state);
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
    fetchBars();
  } else {
    r = field.value * 1000;
    fetchBars();
  }
};

const getLocation = function() {
  const locBtn = helpers.qs("#drink");

  function getCoords() {
    view.drawSpinner();
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(getBars, err => {
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

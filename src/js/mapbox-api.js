import helpers from "./helpers";

mapboxgl.accessToken = "pk.eyJ1IjoibDByZGNhZmUiLCJhIjoiY2poMTF0ZDZhMDBsNjJxbG5seXY2a3E1bCJ9.7j0HI5-gkW1SUKJDQg1k_A";

let map;
let marker;

const drawMap = function(state) {
  const lon = state.coords[1];
  const lat = state.coords[0];
  map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9",
    center: [lon, lat],
    zoom: 12
  });

  const div = helpers.newEl("div");
  div.className = "dot";
  new mapboxgl.Marker(div).setLngLat([lon, lat]).addTo(map);

  return map;
};

const setMarker = function(venue) {
  marker = new mapboxgl.Marker().setLngLat([venue.venue.location.lng, venue.venue.location.lat]).addTo(map);
};

const removeMarker = function() {
  if (marker === undefined) {
    console.log("marker undefined");
    return;
  }
  marker.remove();
};

export default { setMarker, drawMap, removeMarker };

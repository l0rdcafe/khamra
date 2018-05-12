import helpers from "./helpers";

mapboxgl.accessToken = "pk.eyJ1IjoibDByZGNhZmUiLCJhIjoiY2poMTF0ZDZhMDBsNjJxbG5seXY2a3E1bCJ9.7j0HI5-gkW1SUKJDQg1k_A";
const setMap = function(venue, state) {
  const lon = state.coords[1];
  const lat = state.coords[0];
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9",
    center: [lon, lat],
    zoom: 12
  });

  new mapboxgl.Marker().setLngLat([venue.venue.location.lng, venue.venue.location.lat]).addTo(map);

  /* state.venues.forEach(element => {
    new mapboxgl.Marker().setLngLat([element.venue.location.lng, element.venue.location.lat]).addTo(map);
  }); */

  const div = helpers.newEl("div");
  div.className = "dot";
  new mapboxgl.Marker(div).setLngLat([lon, lat]).addTo(map);
  return map;
};

export default { setMap };

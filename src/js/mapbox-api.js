import helpers from "./helpers";

mapboxgl.accessToken = "pk.eyJ1IjoibDByZGNhZmUiLCJhIjoiY2poMTF0ZDZhMDBsNjJxbG5seXY2a3E1bCJ9.7j0HI5-gkW1SUKJDQg1k_A";
const setMap = function(state) {
  const lon = state.coords[1];
  const lat = state.coords[0];
  const map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9",
    center: [lon, lat],
    zoom: 12
  });

  state.venues.forEach(element => {
    const { city } = element.venue.location;
    const { address } = element.venue.location;
    const { name } = element.venue;
    const { distance } = element.venue.location;
    const { longitude } = element.venue.location;
    const { latitude } = element.venue.location;
    const fullAddress = `${address}, ${city}`;
    const popup = new mapboxgl.Popup({ offset: 35 }).setHTML(
      `<h6>${name}</h6><small>${distance} meters</small><p>${fullAddress}</p>`
    );

    new mapboxgl.Marker()
      .setLngLat([element.venue.location.lng, element.venue.location.lat])
      .setPopup(popup)
      .addTo(map);
  });
  return map;
};

export default { setMap };
